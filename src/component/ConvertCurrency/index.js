import React from 'react'
import { InputNumber, Select, Button, Input } from 'antd'

const { Option } = Select
const currencyType = [
	'SELECT',
	'AUD',
	'BGN',
	'BRL',
	'CAD',
	'CHF',
	'CNY',
	'CZK',
	'DKK',
	'EUR',
	'GBP',
	'HKD',
	'HRK',
	'HUF',
	'IDR',
	'ILS',
	'INR',
	'ISK',
	'JPY',
	'KRW',
	'MXN',
	'MYR',
	'NOK',
	'NZD',
	'PHP',
	'PLN',
	'RON',
	'RUB',
	'SEK',
	'SGD',
	'THB',
	'TRY',
	'USD',
	'ZAR',
]

class ConvertCurrency extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputFieldValue: 0,
			outputFieldValue: 0,
			inputDropdownValue: currencyType[0],
			outputDropdownValue: currencyType[0],
		}
	}

	onChangeInput = async (e) => {
		const { value } = e.target
		const inputFieldValue = this.removeAlphabetsFromInputField(value)
		this.setState({ inputFieldValue })
	}

	onChangeInputDropdown = (value) => {
		this.setState({ inputDropdownValue: value })
	}

	onChangeOutpurDropdown = (value) => {
		this.setState({ outputDropdownValue: value })
	}

	removeAlphabetsFromInputField = (value) => {
		return value.replace(/[^0-9\.]/g, '')
	}

	fetchCurrencyDetails = () => {
		const { inputDropdownValue, outputDropdownValue, inputFieldValue } = this.state

		return fetch(
			`https://api.frankfurter.app/latest?amount=${inputFieldValue}&from=${inputDropdownValue}&to=${outputDropdownValue}`
		)
			.then((results) => results.json())
			.then((data) => {
				return data.rates
			})
	}

	calculateOutputCurrency = async () => {
		const data = await this.fetchCurrencyDetails()
		console.log(data)
	}

	render() {
		const {
			inputDropdownValue,
			outputDropdownValue,
			inputFieldValue,
			outputFieldValue,
		} = this.state
		return (
			<div style={{ display: 'flex', textAlign: 'center', margin: 'auto' }}>
				<div
					style={{
						width: '20vw',
						border: '1px solid #242424ab',
						padding: 30,
					}}>
					<div style={{ marginBottom: 10 }}>Input Amount</div>
					<div style={{ marginBottom: 10 }}>
						<Input
							onChange={this.onChangeInput}
							placeholder="Input Amount"
							maxLength={25}
							defaultValue={0}
							value={inputFieldValue}
						/>
					</div>
					<div style={{ marginBottom: 10 }}>
						<Select
							style={{ width: 150 }}
							defaultValue={currencyType[0]}
							placeholder="Select currency"
							value={inputDropdownValue}
							onChange={this.onChangeInputDropdown}>
							{currencyType.map((currency) => {
								return <Option value={currency}>{currency}</Option>
							})}
						</Select>
					</div>
				</div>
				<div
					style={{
						width: '15vw',
						marginTop: '10vh',
					}}>
					<Button onClick={this.calculateOutputCurrency}>Convert</Button>
				</div>
				<div
					style={{
						width: '20vw',
						border: '1px solid #242424ab',
						padding: 30,
					}}>
					<div style={{ marginBottom: 10 }}>Output Amount</div>
					<div style={{ marginBottom: 10 }}>
						<Input
							disabled
							onChange={this.onChangeOutput}
							placeholder="Output Amount"
							maxLength={25}
							defaultValue={0}
							value={outputFieldValue}
						/>
					</div>
					<div style={{ marginBottom: 10 }}>
						<Select
							style={{ width: 150 }}
							defaultValue={currencyType[0]}
							value={outputDropdownValue}
							placeholder="Select currency"
							onChange={this.onChangeOutpurDropdown}>
							{currencyType.map((currency) => {
								return <Option value={currency}>{currency}</Option>
							})}
						</Select>
					</div>
				</div>
			</div>
		)
	}
}

export default ConvertCurrency
