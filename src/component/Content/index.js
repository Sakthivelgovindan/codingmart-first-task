import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ConvertCurrency from '../ConvertCurrency'

import styles from './styles'

function Content(props) {
	return (
		<div style={styles.content}>
			<Switch>
				<Route path="/" component={() => <ConvertCurrency />} />
				<Route path="/tasks/convertcurrency" component={() => <ConvertCurrency />} />
			</Switch>
		</div>
	)
}

export default Content
