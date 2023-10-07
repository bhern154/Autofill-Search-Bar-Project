const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//filter the fruit array with search input and return a new array
const search = str => ([...fruit].filter(fruit => fruit.toLowerCase().includes(str.toLowerCase())));

// call search() to search the input from the fruit array
// send results and input to showSuggestions() 
const searchHandler = e => (showSuggestions(search(input.value), e.target.value));

// append the first 5 results to suggestions element as li elements
function showSuggestions(results, inputVal) {

	//empty suggestions dropdown every time the input changes 
	suggestions.innerHTML = "";

	//slice results array to only show first 5 results
	const firstFive = results.slice(0,5);
	firstFive.forEach(fruit => {
		const li = document.createElement('li');
		li.innerHTML = boldInput(fruit, inputVal);
		suggestions.append(li);
	});

	//if the input is deleted, show no suggestions
	if(inputVal === ""){
		suggestions.innerHTML = "";
	}
}

// update the input text box with the fruit the user clicked 
const useSuggestion = e => {
	
	// if you click on strong text, fill the texbox with the parent
	// otherwise, fill the textbox with the element
	e.target.tagName == 'STRONG' ? input.value = e.target.parentNode.innerText : input.value = e.target.innerText;

	// empty the suggestions dropdown since fruit has been selected
	suggestions.innerHTML = "";
}

//bold text that matches user input on each suggestion and return updated array
const boldInput = (fruit, inputVal) => {

	//find the beginning of the input in the suggestion
	let inputStart = 0;
	for (let i = 0; i < fruit.length; i++) { 
		let slice = fruit.slice(i,fruit.length);
		if(slice.toLowerCase().includes(inputVal.toLowerCase())) inputStart = i;
	};

	//get the end of the input in the suggestion
	const inputEnd = inputStart + inputVal.length;

	//split the suggestion text into 3 parts
	const unbolded1 = fruit.slice(0,inputStart);
	const bolded = fruit.slice(inputStart, inputEnd);
	const unbolded2 = fruit.slice(inputEnd,fruit.length);

	//return the suggestion with STRONG tags to bold input text
	return `${unbolded1}<strong>${bolded}</strong>${unbolded2}`;
}

// change background color to suggestion on mouseover
//if you hover over the STRONG text, highlight the parent, otherwise, highlight the element
const highlight = e => (e.target.tagName == 'STRONG' ? e.target.parentNode.style.background = "rgba(222, 63, 0, 0.5)" : e.target.style.background = "rgba(222, 63, 0, 0.5)");

// revert background color to suggestion on mouseout
//if you hover over the STRONG text, unhighlight the parent, otherwise, unhighlight the element
const unHighlight = e => (e.target.tagName == 'STRONG' ? e.target.parentNode.style.background = "rgba(255,255,255, .22)" : e.target.style.background = "rgba(255,255,255, .22)");

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
suggestions.addEventListener('mouseover', highlight);
suggestions.addEventListener('mouseout', unHighlight);

// Code "MAP"
// 1 - listen for key presses on the input element
// 2 - call searchHandler() to handle the functionality
// 3 - searchHandler() calls search() to get list of results
// 4 - searchHandler() sends results and input to showSuggestions()
// 5 - showSuggestions() appends the first 5 results as li elements
// 6 - showSuggestions() calls boldInput() to add bold styling to li elements
// 7 - ADDITIONALLY, listen for mouseover and mouseout on the suggestions element
// 8 - call highlight() and unhighlight() to change background color on elements
// 9 - ADDITIONALLY, listen for clicks on the suggestions element
// 10 - call useSuggestion() to update the input texbox when an li is clicked
