import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'

const WeatherDetails = () => {
  const [data, setData] = useState({})
  const { lat, lon } = useParams()

  console.log(lat, lon)

  const fetchCity = async () => {
    console.log('sto fetchando le info')

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=44ec3e35b6cc604242ad14fd87fac22c`
    try {
      const resp = await fetch(endpoint)
      if (resp.ok) {
        const response = await resp.json()
        console.log(response)
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCity()
  }, [lat, lon]) // Aggiungi lat e lon come dipendenze

  return (
    <Container className="justify-content-center">
      <Card className="mt-5">
        <Card.Body>
          <Card.Title>Città: {data.name}</Card.Title>
          <Card.Text>Paese: {data.sys?.country}</Card.Text>
          <Card.Text>Temperatura: {data.main?.temp} °C</Card.Text>
          <Card.Text>
            Condizioni meteo: {data.weather?.[0]?.description}
          </Card.Text>
          <Card.Text>Vento: {data.wind?.speed} m/s</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default WeatherDetails
