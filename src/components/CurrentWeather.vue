<template>
  <div>
    <h2>Current Weather <span v-if="weatherData"> for {{ weatherData.name }}, {{weatherData.sys.country }}</span></h2>
    <p>
      <router-link to="/">Home</router-link> |
      <router-link v-bind:to="{ name: 'Forecast', params: { cityId: $route.params.cityId } }">View 5-Day Forecast</router-link>
    </p>
    <div v-if="weatherData && errors.length===0">

       <weather-summary v-bind:weatherData="weatherData.weather"></weather-summary>
      
      <weather-data v-bind:weatherData="weatherData.main"></weather-data>
      </div>
    
    <div v-else>
      <h2>Loading...</h2>
    </div>
    <error-list v-bind:errorList="errors"></error-list>
  </div>
</template>

<script>
import {API}from '@/common/api';
import WeatherSummary from '@/components/WeatherSummary';
import WeatherData from '@/components/WeatherData';
import ErrorList from '@/components/ErrorList';
export default {
  name: 'CurrentWeather',
  data () {
    return {
      weatherData: null,
      errors: [],
      query: ''
    }
  },
  created () {
  
    API.get('weather', {
      params: {
          id: this.$route.params.cityId
      }
    })
    .then(response => {
      this.weatherData = response.data
    })
    .catch(error => {
      this.errors.push(error)
    });
  },
  components: {
    'weather-summary': WeatherSummary,
    'weather-data': WeatherData,
    'error-list' : ErrorList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.errors li {
  color: red;
  border: solid red 1px;
  padding: 5px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 300px;
  min-height: 300px;
  border: solid 1px #e8e8e8;
  padding: 10px;
}

a {
  color: #42b983;
}
</style>


