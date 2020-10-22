import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header'
import SideBar from '../SideBar'
import Content from '../Content'
import styles from './styles'

class Root extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<BrowserRouter>
				<div>
					<SideBar />
					<div style={styles.container}>
						<Header />
						<Content />
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default Root
