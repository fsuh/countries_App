import React, { useState, useEffect } from "react";
import {
  Spinner,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getAllCountries } from "../features/countries/countriesSlice";
import { clearFavourites } from "../features/countries/favouritesSlice";

const Favourites = () => {
  const dispatch = useDispatch();

  let { countries } = useSelector((state) => state.countries);
  const { isLoading } = useSelector((state) => state.countries);
  const [search, setSearch] = useState("");
  const { favourites } = useSelector((state) => state.favourites);

  if (favourites !== null) {
    countries = countries.filter((c) => favourites.includes(c.name.common));
  } else {
    countries = [];
  }

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
        <Button
          onClick={() => {
            dispatch(clearFavourites());
          }}
        >
          Clear Favourites
        </Button>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countries
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
                    <Card.Img
                      variant="top"
                      src={flags.svg}
                      alt={name.common}
                      style={{
                        objectFit: "cover",
                        minHeight: "200px",
                        maxHeight: "200px",
                      }}
                      className="rounded h-50"
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

export default Favourites;
