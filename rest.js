const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            displayCountries(data);
            setupSearch(data); // Set up the search functionality with the fetched data
            setupRegionFilter(data); // Set up the region filter
        });
};

const displayCountries = countries => {
    const countriesHTML = countries.map(country => getCountry(country)).join(''); // Combine array into a string
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML; // Set the innerHTML
};

const getCountry = (country) => {
    return `
    <div class="country-div">
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <h2>${country.name.common}</h2>
        <h4>Population: ${country.population}</h4>
        <h4>Region: ${country.region}</h4>
        <h4>Capital: ${country.capital}</h4>
    </div>`;
};

const setupSearch = (countries) => {
    const searchBar = document.getElementById('search-bar');
    const regionFilter = document.getElementById('region-filter');

    const filterCountries = () => {
        const searchTerm = searchBar.value.toLowerCase(); // Get search term
        const selectedRegion = regionFilter.value; // Get selected region
        const filteredCountries = countries.filter(country => {
            const matchesName = country.name.common.toLowerCase().includes(searchTerm); // Name filter
            const matchesRegion = selectedRegion === '' || country.region === selectedRegion; // Region filter
            return matchesName && matchesRegion; // Return true only if both conditions match
        });
        displayCountries(filteredCountries); // Display filtered countries
    };

    searchBar.addEventListener('input', filterCountries); // Trigger on search input
    regionFilter.addEventListener('change', filterCountries); // Trigger on region filter change
};

// Initialize the API load
loadCountryAPI();
