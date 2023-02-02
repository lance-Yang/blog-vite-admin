---
title: React Hooks 实现自定义表单
cover: ../sampleImg/default_bg.png
categories: React
tags: React
keywords: 自定义表单,antd4自定义表单
description: 自定义表单实现
---

## 前景：
在我们的平常业务代码开发中，其实要实现自己自定义的一个表单这种场景是非常多的(就像我们封装组件一样)，封装的组件或表单能大大加强我们开发的效率和代码的复用，下面我们就用Hooks的方式实现自己的一个表单组件
{% note info flat  %}
下面是基于antd4表单实现的方式，antd3表单实现的方式是基于高阶组件的方式实现的，会有个问题，比如说个别组件数据发生变化会导致整个Form表单重新渲染，antd4改进了这个问题
{% endnote %}

## 原理及实现思路
我们都知道antd中是用一个`Form`组件来包裹整个表单,然后再通过`FormItem`组件来包裹我们的`input`，在FormItem组件上通过添加`name,rules`等属性来将里面的组件变成受控组件,我们就不用在input上面再添加value或者onChang事件来控制了，然后我们在Form组件上通过一个叫`useForm`的hook函数来获取form的实例将实例放在`Form`组件上，再通过一个 `onFinish` 方法来获取我们表单的数据
![antd](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78abecd5-154a-4bdc-90ef-f4959377f1bc/28dfd73a-dbbc-481e-b3bf-040eccf28d94.png)
{% note info flat  %}
我们要封装的组件：
1.`index组件`：导出我们自定义的Form和FormItem和useForm的组件
1.`Form组件`：表单的共同组件，可以通过该组件获取整个表单的实例和data
2.`FormItem组件`：通过该组件可以将子组件变成受控组件
3.`useForm`：相当于Form的一个数据管理仓库，维护`Form`实例和提供一些函数给Form组件使用(`核心都在里面`)
4.`FormContext组件`：通过useForm创建出来的`form`实例和函数，如果FormItem组件要使用或者是FormItem里面的子组件要使用的话，我们就可以通过该组件一层层传递下去,这里使用React中的Context方式传递，然后通过提供的`Provider`组件去消费组件
{% endnote %}
### index组件实现
```js
// import React from "react";
import _Form from "./Form";
import FormItem from "./FormItem";
import useForm from "./useForm";

// 使用 React.forwardRef 来获取传递给它的 ref ,然后转发到Form节点中
// const Form = React.forwardRef(_Form)
const Form = _Form;
Form.item = FormItem;
// Form.item = FormItem;
Form.useForm = useForm;

export {FormItem,useForm};
export default Form;
```
### Form组件实现
```js
import React from "react";
import FormContext from "./FormContext"
import useForm from "./useForm";

export default function Form({ children, form, onFinish, onFinishFailed },ref) { 
    const [formInstance] = useForm(form);
    // 将formInstance暴露给父组件使用
    // React.useImperativeHandle(ref,() => formInstance)
    formInstance.setCallBacks({
        onFinish, onFinishFailed
    })
    return (
        <form onSubmit={
            (e) => {
                e.preventDefault();
                form.submit();
            }
        }>
            <FormContext.Provider value={formInstance}>
                {children}
            </FormContext.Provider>
        </form>
    )
}

```
### FormItem组件实现
```js
import React, { Component } from "react"
import FormContext from "./FormContext"

export default class FormItem extends Component {
    // contextType方式获取写法
    static contextType  = FormContext;
    componentDidMount(){
        //将实例添加到仓库并监听
        this.unregisterField = this.context.registerField(this)
    }
    // 组件卸载时取消监听
    componentWillUnmount(){
        this.unregisterField()
    }
    // 调用 forceUpdate() 强制让组件重新渲染
    updateStorage = () => {
        this.forceUpdate()
    }
    // 将子组件的控制权交给该函数去处理,这里通过name来区别和获取子组件的value
    handleGetControlData = () => {
        const {name} = this.props;
        return {
            // 根据name获取仓库中对应的value值，例：<FormItem name='userName'>
            value: this.context.getFieldValue(name) || "",
            onChange: (e) => {
                // 获取FormItem子组件受控组件的value值，并通过setFiledValue修改我们仓库对应的value值
                const newValue = e.target.value;
                console.log(newValue, 'newValue....')
                this.context.setFiledValue({ [name]: newValue })
            }
        }
    }
    render() {
        console.log("render");
        // React自带的Api方法，在不改变子组件的前提下克隆了一个新的组件并将新的handleGetControlData函数赋值到该节点中
        return React.cloneElement(this.props.children, this.handleGetControlData());
    }
}
```
### useForm实现
```js
import React from 'react';
class FormStore {
	constructor() {
		// 状态管理库
		this.store = {};
		this.fieldEntities = []; // file实例
		this.callbacks = {}; // 将onFinish,  onFinishFailed函数存放在store中
	}
	setCallBacks = (newCallBacks) => {
		this.callbacks = {
			...this.callbacks,
			...newCallBacks
		};
	};
	// 注册组件(将每个FormItem组件实例添加到仓库中,监听的作用)
	registerField = (field) => {
		this.fieldEntities.push(field);
		// 组件卸载了也必须将该组件的实例清空掉,取消监听
		return () => {
			this.fieldEntities = this.fieldEntities.filter((_f) => _f !== field);
			delete this.store[field.props.name];
		  };
	};
	// 根据name获取单个value
	getFieldValue = (name) => {
		return this.store[name];
	};
	// 获取所有的value
	getAllFieldValue = () => {
		return { ...this.store };
	};
	// 修改value
	setFiledValue = (newStore) => {
		this.store = {
			...this.store,
			...newStore
		};
		// 重新渲染组件
		// 拿到要修改的newStore和我们注册的组件实例，根据name值和newStore中要修改的name做比较
		//然后调用FormItem中的updateStorage方法强制更新
		// 例：要修改的newStore：{userName:'xxx'}和<FormItem name='userName'>组件中的name比较，相等就更新当前组件
		this.fieldEntities.forEach((field) => {
			Object.keys(newStore).forEach((key) => {
				if (field.props.name === key) {
					field.updateStorage();
				}
			});
		});
	};
	// 校验表单
	validate = () => {
		let err = [];
		this.fieldEntities.forEach(field => {
			//获取FormItem上的name和rules属性
			const {name,rules} = field.props;
			const rule = rules && rules[0];
			//根据name值获取当前value值
			const value = this.getFieldValue(name)
			if(rule && rule.require && (value === undefined || value === "")){
				err.push({
					[name]:rule.message,
					value
				})
			}
		})
		return err;
	};
	// 表单提交方法
	submit = () => {
		const { onFinish, onFinishFailed } = this.callbacks;
		let err = this.validate();
		if (err.length > 0) {
			console.log('验证失败。。。')
			onFinishFailed(err, this.getAllFieldValue);
		} else {
			console.log('验证通过。。。')
			onFinish(this.getAllFieldValue());
		}
	};
	// Form 表单函数
	getForm = () => {
		return {
			getFieldValue: this.getFieldValue,
			getAllFieldValue: this.getAllFieldValue,
			setFiledValue: this.setFiledValue,
			registerField: this.registerField,
			setCallBacks: this.setCallBacks,
			submit: this.submit
		};
	};
}
export default function useForm(form) {
	// 初始化store,用formRef的原因是保证每次初始化时用的是同一个form实例
	const formRef = React.useRef();
	if (!formRef.current) {
		if (form) {
			formRef.current = form;
		} else {
			// 创建FormStore实例并export出去
			const formStore = new FormStore();
			formRef.current = formStore.getForm();
		}
	}
	return [ formRef.current ];
}
```
### FormContext组件实现
```js
import React from 'react';
// 创建context对象
const FormContext = React.createContext();
export default FormContext;
```
## 具体调用
在页面调用时，写了两种调用的方法(hook方式和类组件的方式,默认时hook，类组件的我注释掉了)
```js
import './index.css'
import Form, { FormItem, useForm } from '../components/Form';
import React, { useEffect } from 'react';
// import Form, { FormItem } from '../components/Form';
// import React,{ Component } from 'react';
// 函数组件的用法(用useForm的方式)
export default function IndexPage() {
	const [form] = useForm()
	// 表单验证成功
	const onFinish = (value) => {
		console.log(value)
	}
	// 表单验证失败
	const onFinishFailed = (value) => {
		console.log(value)
	}
	useEffect(() => {
		// 初始化FormItem 中input的value值
		form.setFiledValue({ 'userName': "default" })
	})
	return (
		<div className="indexForm">
			<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<FormItem name='userName' rules={[
					{require:true,message:'userName 不能为空!'}
				]}>
					<input placeholder="userName" />
				</FormItem>
				<FormItem name='userPassword' rules={[
					{require:true,message:'userPassword 不能为空!'}
				]}>
					<input placeholder="userPassword" />
				</FormItem>
				<button>submit</button>
			</Form>
		</div>
	);
};
// 类组件用法(通过Ref转发)
// 1：创建一个ref
// 2：子组件要想使用父组件的ref是不能通过props值来直接传递的，必须要
// 	  使用 React.forwardRef 来获取传递给它的 ref ,然后转发到Form节点中
//    在Form文件夹中的index组件中，我们转发一下Form,
// 3: 将formInstance暴露给父组件使用 React.useImperativeHandle(ref,() => formInstance)
// export default class IndexPage extends Component {
// 	formRef = React.createRef()
// 	componentDidMount(){
// 		this.formRef.current.setFiledValue({userName: "default"});
// 	}
// 	// 表单验证成功
// 	onFinish = (value) => {
// 		console.log(value)
// 	}
// 	// 表单验证失败
// 	onFinishFailed = (value) => {
// 		console.log(value)
// 	}
// 	render() {
// 		return (
// 			<div className="indexForm">
// 				<Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
// 					<FormItem name='userName'>
// 						<input placeholder="userName" />
// 					</FormItem>
// 					<FormItem name='userPassword'>
// 						<input placeholder="userPassword" />
// 					</FormItem>
// 					<button>submit</button>
// 				</Form>
// 			</div>
// 		);
// 	}
// };
```
## 案例下载
地址：[antd-form.rar](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78abecd5-154a-4bdc-90ef-f4959377f1bc/cb486d32-4f0d-40a2-8053-4aec34e3ac63.rar)