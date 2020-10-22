import React from 'react'
import styles from './styles'

class Header extends React.Component {
	render() {
		return (
			<div style={styles.header}>
				<div style={styles.headerTitle}>Convert Currency</div>
			</div>
		)
	}
}

export default Header
