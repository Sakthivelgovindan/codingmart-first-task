import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './styles'

class Header extends React.Component {
	render() {
		return (
			<div style={styles.header}>
				<div style={{ padding: 15 }}>Convert Currency</div>
			</div>
		)
	}
}

export default Header
