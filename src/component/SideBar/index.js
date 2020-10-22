import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styles from './styles.js'
import './index.css'

class SideBar extends React.Component {
	render() {
		return (
			<div style={styles.sideBar}>
				<div>
					<div style={styles.sideBarHeader}>CODINGMART</div>
					<div style={styles.divider}></div>
					<div style={styles.sideBarContainer} className={'sideBarContainer'}>
						<div style={styles.sideBarContainerList}>
							TASKS
							<div style={styles.sideBarList}>
								<div style={styles.menuList}>
									<Link
										to="/tasks/convertcurrency"
										style={styles.menuItem}
										className={
											this.props.location.pathname.substr(1).split('/')[1] ===
											'convertcurrency'
												? 'activeTab'
												: ''
										}>
										Convert currency - Task 1
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(SideBar)
