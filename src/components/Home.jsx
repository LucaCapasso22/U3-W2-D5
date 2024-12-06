import { useState } from 'react'
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
  const [weather, setWeather] = useState(null)
  const [cityName, setCityName] = useState('')

  const fetchAllCities = async () => {
    console.log('sto fetchando le cities')
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=3&appid=44ec3e35b6cc604242ad14fd87fac22c`
    try {
      const resp = await fetch(endpoint)
      if (resp.ok) {
        const response = await resp.json()
        console.log(response)

        console.log(response[0].lat)
        fetchWeatherInfo(response[0].lat, response[0].lon)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWeatherInfo = async (lat, lon) => {
    console.log('sto fetchando le info')
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=44ec3e35b6cc604242ad14fd87fac22c`
    try {
      const resp = await fetch(endpoint)
      if (resp.ok) {
        const response = await resp.json()
        console.log(response)
        setWeather(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleSubmit(e) {
    console.log('handleSubmit')
    e.preventDefault()
    fetchAllCities()
  }

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <div className="mt-5 mb-2 p-5 rounded home bg-opacity-50 shadow">
          <h1 className="display-2 mb-3">Benvenuto su EpiWeather!</h1>
          <h3 className="fw-semibold mb-2">Cerca il meteo della tua città</h3>
          <InputGroup className="my-3 justify-content-center">
            <FormControl
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  fetchAllCities()
                }
              }}
              onChange={(e) => {
                setCityName(e.target.value)
              }}
              placeholder="Inserisci il nome della città qui..."
              aria-label="Cerca"
              aria-describedby="basic-addon2"
              className="rounded-pill searchbar"
            />
            <Button
              className="ms-2 rounded"
              variant="warning"
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              Cerca
            </Button>
          </InputGroup>
        </div>
      </Container>
      {weather && (
        <>
          <Container className="justify-content-center">
            <Row className="justify-content-center">
              <Col xs={4}>
                <Card className="cardbg text-white">
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      {weather.name}
                    </Card.Title>
                    <Card.Text>{weather.main.temp + '°C'}</Card.Text>
                    <Link
                      className="btn btn-primary"
                      to={`/${weather.coord.lat}/${weather.coord.lon}`}
                    >
                      Scopri di più{' '}
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default Home
