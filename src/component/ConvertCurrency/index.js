import React from 'react'
import { Select, Button, Input, notification } from 'antd'
import styles from './styles'

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
			onload: true,
			loading: false,
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
		const { outputDropdownValue, inputDropdownValue, inputFieldValue } = this.state

		if (
			inputDropdownValue !== '' &&
			inputFieldValue !== 0 &&
			inputDropdownValue !== 'SELECT' &&
			outputDropdownValue !== 'SELECT' &&
			inputDropdownValue !== outputDropdownValue
		) {
			this.setState({ loading: true })
			const data = await this.fetchCurrencyDetails()
			this.setState({ outputFieldValue: data[outputDropdownValue], loading: false })
		} else {
			if (
				inputDropdownValue === outputDropdownValue &&
				inputDropdownValue !== 'SELECT' &&
				outputDropdownValue !== 'SELECT' &&
				inputDropdownValue !== '' &&
				inputFieldValue !== 0
			) {
				notification.warning({
					message: `Please choose two different currency.`,
					placement: 'bottomRight',
					duration: 5,
				})
			}
		}

		this.setState({ onload: false })
	}

	render() {
		const {
			inputDropdownValue,
			outputDropdownValue,
			inputFieldValue,
			outputFieldValue,
			onload,
			loading,
		} = this.state

		return (
			<div style={styles.convertCurrencyContainer}>
				<div style={styles.currencyInputContainer}>
					<div style={styles.marginBottomDiv}>Input Amount</div>
					<div style={styles.marginBottomDiv}>
						<Input
							onChange={this.onChangeInput}
							placeholder="Input Amount"
							maxLength={25}
							defaultValue={0}
							value={inputFieldValue}
						/>
						{!onload && (inputFieldValue === 0 || inputFieldValue === '') ? (
							<span style={styles.errorTextColor}>Please enter input amount</span>
						) : null}
					</div>
					<div style={styles.marginBottomDiv}>
						<Select
							style={styles.dropdownWidth}
							defaultValue={currencyType[0]}
							placeholder="Select currency"
							value={inputDropdownValue}
							onChange={this.onChangeInputDropdown}>
							{currencyType.map((currency) => {
								return <Option value={currency}>{currency}</Option>
							})}
						</Select>
						<br />
						{!onload && inputDropdownValue === 'SELECT' ? (
							<span style={styles.errorTextColor}>Please choose input currency</span>
						) : null}
					</div>
				</div>
				<div style={styles.currencyConvertButton}>
					<Button loading={loading} onClick={this.calculateOutputCurrency}>
						{loading ? 'Converting' : 'Convert'}
					</Button>
				</div>
				<div style={styles.currencyInputContainer}>
					<div style={styles.marginBottomDiv}>Output Amount</div>
					<div style={styles.marginBottomDiv}>
						<Input
							placeholder="Output Amount"
							maxLength={25}
							defaultValue={0}
							value={outputFieldValue}
						/>
					</div>
					<div style={styles.marginBottomDiv}>
						<Select
							style={styles.dropdownWidth}
							defaultValue={currencyType[0]}
							value={outputDropdownValue}
							placeholder="Select currency"
							onChange={this.onChangeOutpurDropdown}>
							{currencyType.map((currency) => {
								return <Option value={currency}>{currency}</Option>
							})}
						</Select>
						<br />
						{!onload && outputDropdownValue === 'SELECT' ? (
							<span style={styles.errorTextColor}>Please choose output currency</span>
						) : null}
					</div>
				</div>
			</div>
		)
	}
}

export default ConvertCurrency
