<template>
  <div>
    <h1 class='title'>Welkom bij Nexus Movies</h1>
    <div class="searchBar-container">
      <div class="searchBar-wrapper">
        <input
          type="text"
          placeholder="Zoek op film of genre"
          class="searchBar"
          v-model="searchTerm"
          @input="handleSearch"
        />
      </div>
    </div>
      <div v-if="isLoading" class="loading-container">
        <!-- <circular-progress /> -->
      </div>
      <p v-else-if="error" class="error-message">
        Er is een fout opgetreden!
      </p>
      <div v-else>
        <div v-if="filteredMovies.length === 0" class="noResults">
          Geen zoekresultaten
        </div>
        <div v-else>
          <div class="movieList-container">
          <div
            v-for="(movie, index) in filteredMovies"
            :key="`${movie.title}-${index}`"
            class="movie-item"
            @click="handleClick(movie)"
          >
            <img :src="movie.thumbnail" :alt="movie.title" class="movie-image" />
            <div class="movie-details">
              <p class="movie-genres">{{ movie.genres.join(', ') }}</p>
              <h2 class="movie-title">
                {{ movie.title }} - {{ movie.year }} <br />
              </h2>
              <p class="movie-description">{{ shortenDescription(movie.extract, 155) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted, computed  } from 'vue';
import { getMovies } from '../api';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const movies = ref([]);
    const isLoading = ref(true);
    const error = ref(null);
    const searchTerm = ref('');
    const router = useRouter();

    const fetchMovies = async () => {
      try {
        const response = await getMovies([]);
        const selectedMovies = response.data.slice(100, 120);
        movies.value = selectedMovies;
      } catch (err) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    };

    const shortenDescription = (description, maxLength) => {
      if (description.length > maxLength) {
        return `${description.substring(0, maxLength)}...`;
      }
      return description;
    };

    const handleSearch = (event) => {
      searchTerm.value = event.target.value;
    };

    const clearSearch = () => {
      searchTerm.value = '';
    };

    const filteredMovies = computed(() => {
      const searchTermLowerCase = searchTerm.value.toLowerCase();
      return movies.value.filter((movie) => {
        const titleLowerCase = movie.title.toLowerCase();
        const genresLowerCase = movie.genres.map((genre) => genre.toLowerCase());
        return (
          titleLowerCase.startsWith(searchTermLowerCase) ||
          genresLowerCase.some((genre) => genre.startsWith(searchTermLowerCase))
        );
      });
    });

    const handleClick = (movie) => {
      router.push(`/movieDetail/${movie.title}`);
      window.scrollTo(0, 0);
    };

    onMounted(() => {
      fetchMovies();
    });

    return {
      movies,
      isLoading,
      error,
      searchTerm,
      filteredMovies,
      handleSearch,
      clearSearch,
      handleClick,
      shortenDescription,
    };
  },
};
</script>

<style scoped>
.title{
  text-align: center;
}

.movieList-container{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-left: 67px;
  margin-top: 25px; 
  gap: 20px;
}

.movie-item{
  border-radius: 2%;
  width: 300px; 
  height: 565px;
  margin-bottom: 58px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;  
  background: white;
}
  
.movie-image{
  height: 400px;
  width: 100%;
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
}
  
.movie-details {
  padding: 8px 8px 0;
}
  
.movie-genres {
  font-size: 14px;
  margin: 0;
  color: #888;
}
  
.movie-title {
  font-size: 16px;
  margin-bottom: 5px;
}
  
.movie-description {
  font-size: 14px;
}

.searchBar-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
  
.searchBar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
  
.clearIcon {
  position: absolute;
  right: 8px;
  cursor: pointer;
}
  
.searchBar {
  width: 230px;
  font-size: 24px;  
}

.noResults{
  grid-column: span 5;
  margin: 290.5px auto;
  font-size: 36px;
  text-align: center;
}

/* voor op laptop */
@media (max-width: 1540px) {
  .movieList-container {
    grid-template-columns: repeat(4, 1fr);
  }

  .noResults{
    margin: 149.5px auto;
  }
}
</style>