import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
	Container,
	Typography,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Button,
} from "@mui/material"
import HomeButton from "./HomeButton"

const MonsterDetail = () => {
	const [monstersData, setMonstersData] = useState([])

	useEffect(() => {
		const fetchMonstersData = async () => {
			try {
				const response = await fetch("/monsters.json")
				const data = await response.json()
				setMonstersData(data)
			} catch (error) {
				console.error("Error fetching monsters data:", error)
			}
		}

		fetchMonstersData()
	}, [])

	const { name } = useParams()
	const monster = monstersData.find((monster) => monster.Name === name)

	if (!monster) {
		return (
			<Container
				sx={{
					color: "#e0e0e0",
					padding: "20px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<Typography variant='h2'>Monster not found</Typography>
				<HomeButton />
			</Container>
		)
	}

	return (
		<Container
			sx={{
				color: "#e0e0e0",
				padding: "20px",
				paddingBottom: "100px", // Adjust this value as needed
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				minHeight: "100vh",
			}}
		>
			<Typography variant='h2' gutterBottom>
				{monster.Name}
			</Typography>
			<Paper
				sx={{
					bgcolor: "#1f1f1f",
					padding: "20px",
					width: "100%",
					maxWidth: "800px",
					marginBottom: "20px",
				}}
			>
				<Typography variant='body1' paragraph>
					{monster.Description}
				</Typography>
				<TableContainer
					component={Paper}
					sx={{
						bgcolor: "#1f1f1f",
						padding: "10px",
					}}
				>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<strong>Actions:</strong>
								</TableCell>
								<TableCell>{monster.Actions}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Damage:</strong>
								</TableCell>
								<TableCell>{monster.Damage}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Special Abilities:</strong>
								</TableCell>
								<TableCell>
									{monster["Special Abilities"]}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Body:</strong>
								</TableCell>
								<TableCell>{monster.Body}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Agility:</strong>
								</TableCell>
								<TableCell>{monster.Agility}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Focus:</strong>
								</TableCell>
								<TableCell>{monster.Focus}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Fate:</strong>
								</TableCell>
								<TableCell>{monster.Fate}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<strong>Insight:</strong>
								</TableCell>
								<TableCell>{monster.Insight}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
                </TableContainer>
				<div style={{ margin: '20px', padding: '10px' }}></div>
				{/* This is padding and not a great way to do this ^*/}
				<Button
					component={Link}
					to='/monsters'
					variant='contained'
					sx={{
						bgcolor: "#333",
						color: "#e0e0e0",
						border: "1px solid #e0e0e0",
						fontWeight: "bold",
						"&:hover": {
							bgcolor: "#555",
						},
					}}
				>
					← Back to Monsters
				</Button>
			</Paper>
			<HomeButton />
		</Container>
	)
}

export default MonsterDetail
