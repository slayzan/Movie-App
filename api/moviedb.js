import axios from "axios";


const apiKey = 'b68d09aea71168cd5dc4cd45f6aa4002'
const apiBaseUrl = 'https://api.themoviedb.org/3';

//endpoints

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


//dynamic endpoints

const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(err){
        console.log('error: ', err)
        return {};
    }
}

// home screen apis

export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMoviesEndpoint);
}

// movie screen apis

export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}


export const fetchPersonDetails = (personId)=>{
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId)=>{
    return apiCall(personMoviesEndpoint(personId));
}

export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}