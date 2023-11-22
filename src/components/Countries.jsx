import React, { useState, useEffect } from "react";
import {
	Spinner,
	Card,
	Col,
	Container,
	Form,
	ListGroup,
	Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
	getAllCountries,
	filterRegion,
} from "../features/countries/countriesSlice";
import { addFavourites } from "../features/countries/favouritesSlice";

const Countries = () => {
	const [search, setSearch] = useState("");
	const [region, setRegion] = useState("");
	const dispatch = useDispatch();
	const { countries, isLoading } = useSelector((store) => store.countries);
	const { favourites } = useSelector((state) => state.favourites);
	const handleChange = (e) => {
		setRegion(e.target.value);
		dispatch(filterRegion(e.target.value));
	};

	useEffect(() => {
		dispatch(getAllCountries());
	}, [dispatch]);

	if (isLoading) {
		return (
			<Col className="text-center m-5">
				<Spinner
					animation="border"
					role="status"
					className="center"
					variant="info"
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</Col>
		);
	}

	return (
		<Container fluid>
			<Row>
				<Col className="mt-5 d-flex justify-content-center">
					<Form>
						<Row>
							<Col>
								<Form.Group>
									<Form.Control
										style={{ width: "18rem" }}
										type="search"
										className="me-2 "
										placeholder="Search for countries"
										aria-label="Search"
										onChange={(e) => setSearch(e.target.value)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group>
									<Form.Select
										className="me-auto"
										aria-label="Default select example"
										onChange={handleChange}
									>
										<option>Filter by Region</option>
										<option value="">All Regions</option>
										<option value="africa">Africa</option>
										<option value="americas">America</option>
										<option value="asia">Asia</option>
										<option value="europe">Europe</option>
										<option value="oceania">Oceania</option>
									</Form.Select>
								</Form.Group>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
			<Row
				xs={2}
				md={3}
				lg={4}
				className=" g-3"
			>
				{countries
					.filter((c) => {
						return (
							c.name.common.toLowerCase().includes(search.toLowerCase()) &&
							(region === "" || c.region.toLowerCase() === region.toLowerCase())
						);
					})
					?.map((country) => {
						const { name, currencies, languages, population, flags } = country;
						return (
							<Col
								key={name.common}
								className="mt-5"
							>
								<LinkContainer
									to={`/countries/${name.common}`}
									state={{ country: country }}
								>
									<Card className="h-100">
										{favourites.includes(name.common) ? (
											<i className={`bi bi-heart-fill text-danger m-1 p-1`}></i>
										) : (
											<i
												className={`bi bi-heart text-danger m-1 p-1`}
												onClick={() => {
													dispatch(addFavourites(name.common));
												}}
											></i>
										)}

										<Card.Img
											variant="top"
											src={flags.svg}
											alt={name.common}
										/>
										<Card.Body className="d-flex flex-column">
											<Card.Title>{name.common}</Card.Title>
											<Card.Subtitle className="mb-5 text-muted">
												{country.name.official}
											</Card.Subtitle>
											<ListGroup
												variant="flush"
												className="flex-grow-1 justify-content-end"
											>
												<ListGroup.Item>
													<i className="bi bi-translate me-2"></i>
													<span>
														{languages
															? Object.values(languages).join(",")
															: "--"}
													</span>
												</ListGroup.Item>
												<ListGroup.Item>
													<i className="bi bi-cash-coin me-2"></i>
													<span>
														{currencies
															? Object.values(currencies)
																	.map((currency) => currency.name)
																	.join(",")
															: "--"}
													</span>
												</ListGroup.Item>

												<ListGroup.Item>
													<i className="bi bi-people me-2"></i>
													<span> {population.toLocaleString()}</span>
												</ListGroup.Item>
											</ListGroup>
										</Card.Body>
									</Card>
								</LinkContainer>
							</Col>
						);
					})}
			</Row>
		</Container>
	);
};

export default Countries;
