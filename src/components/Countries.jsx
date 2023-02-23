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
import { initializeCountries } from "../features/countries/countriesSlice";
import { addFavourites } from "../features/countries/favouritesSlice";
import { removeFavourite } from "../features/countries/favouritesSlice";

const Countries = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const countriesList = useSelector((store) => store.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((store) => store.countries.isLoading);

  // const favIcon = () => {
  //   dispatch(addFavourites(country.name.common));
  //   setActive(!isActive);
  // };

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading) {
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
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((c) => {
            return c.name.common.toLowerCase().includes(search.toLowerCase());
          })
          ?.map((country) => {
            const { name, currencies, languages, population, flags } = country;
            return (
              <Col key={name.common} className="mt-5">
                <LinkContainer
                  to={`/countries/${name.common}`}
                  state={{ country: country }}
                >
                  <Card className="h-100">
                    {favouritesList.includes(name.common) ? (
                      <i
                        className={`bi bi-heart-fill text-danger m-1 p-1`}
                        onClick={() => {
                          dispatch(removeFavourite(name.common));
                        }}
                      ></i>
                    ) : (
                      <i
                        className={`bi bi-heart text-danger m-1 p-1`}
                        onClick={() => {
                          dispatch(addFavourites(name.common));
                        }}
                      ></i>
                    )}

                    <Card.Img variant="top" src={flags.svg} alt={name.common} />
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
