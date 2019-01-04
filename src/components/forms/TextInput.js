import React, { Component } from 'react';
import '../App.css';

class TextInput extends Component {
	handleInput() {
		let input = React.findDOMNode(this.refs.userInput)
		this.props.saveInput(input.value)
		input.value = ''
	},
	render() {
		let label = this.props.label
		return (
			<div className="form-group">
				<label for="input-{}">{ label }</label>
				<input 
					type="text"
					className="form-control"
					id="input-{ label }"
					ref="userInput" />
				<button onClick={ this.handleInput }>Save</button>
			</div>
		)
	}

}

class TextField extends Component {
	render() {
		let label = this.props.label || 'Label'
		let text = this.props.text || 'Nothing yet'
		return (
			<div>
				<p>{ label }</p>
				<p>{ text }</p>
			</div>
		)
	}
}

class Form extends Component {
	constructor(props)	{
		super(props)
		this.state = {
			userIsEditing: false,
			favoriteFlavor: 'Vanilla'
		}

		this.toggleEditing = this.toggleEditing.bind(this)
	}

	toggleEditing() {
		let userIsEditing = !this.state.userIsEditing
		this.setState({
			userIsEditing: userIsEditing
		})
		this.handleSave()
	}

	saveInput(input) {
		this.setState({
			favoriteFlavor: input
		})
	}

	render() {
		// in the middle of porting codepenForms.js to es6ish	
		let userIsEditing = this.state.userIsEditing
		if (userIsEditing) {
			return (
				<div>
					<TextInput
						label={ 'Favorite flavor' }
						saveInput={ this.saveInput } />
					<button onClick={ this.toggleEditing }>Done</button>
				</div>
			)
		}
	}
}


//export default TextInput;
module.exports = {
	TextInput: TextInput,

}
