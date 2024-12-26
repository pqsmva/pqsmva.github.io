import { createProduct } from "../commons/product.js"
import { fetchProducts } from "../firebase/firebase.js"

const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get('s') || ''

let categories = []

let productTemp = []

let selectedCats = []

let products = []

let priceFilters = [
    {
        min: 0,
        max: 500
    },
    {
        min: 500,
        max: 1500
    },
    {
        min: 1500,
        max: 3000
    },
    {
        min: 3000,
        max: 5000
    },
    {
        min: 5000,
        max: 10000
    },

]


let activePrice = null

const filterCategoryWrapper = document.querySelector('.category-filter')
const productGrid = document.querySelector('.products-grid')
const priceFiltersWrapper = document.querySelector('.price-filter')

fetchProducts().then(res => {
    products = res
    productTemp = res
    res.filter(item => ((item.category.toLowerCase()).includes(searchParam.toLowerCase()) || (item.name.toLowerCase()).includes(searchParam.toLowerCase()))).map(item => {

        productGrid.append(createProduct(item))

        const searchCategory = categories.find(category => category.name == item.category)

        if (searchCategory) {
            categories = [...categories.filter(category => category.name != searchCategory.name), { count: searchCategory.count + 1, name: searchCategory.name }]
        } else {
            categories.push({
                name: item.category,
                count: 1
            })
        }
    })

    filterCategoryWrapper.innerHTML = ''
    categories.map(cat => {

        const label = document.createElement("label");
        label.className = "filter-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener('input', (e) => {
            if (e.target.checked) {
                selectedCats.push(cat.name)

            } else {
                selectedCats = selectedCats.filter(x => x != cat.name)
            }

            applyFilters(searchParam, activePrice)


        })

        const span = document.createElement("span");
        span.textContent = `${cat.name} (${cat.count})`;


        label.appendChild(checkbox);
        label.appendChild(span);

        filterCategoryWrapper.appendChild(label);
    });


    priceFiltersWrapper.innerHTML = ''
    priceFilters.map(item => {
        const label = document.createElement("label");
        label.className = "filter-item";
    
        const input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute('min', item.min)

        input.addEventListener('input', (e)=> {
            console.log(e.target.checked, item.min, item.max);
            if (e.target.checked) {
               activePrice = item

               applyFilters(searchParam, activePrice)

               document.querySelectorAll('.price-filter input').forEach(inp => {
                if (inp.getAttribute('min') == item.min) {
                    
                } else {
                    inp.checked = false
                }
               })
               
            } else {
                activePrice = null

            }

            applyFilters(searchParam, activePrice)
            
            
        })
    
        const span = document.createElement("span");
        span.textContent = `${item.min} - ${item.max} Azn`;
    
        label.appendChild(input);
        label.appendChild(span);
        priceFiltersWrapper.appendChild(label);


    });




})






const applyFilters = (search='', price = null) => {
    productGrid.innerHTML = ''

    let newList = []

    newList = productTemp.filter(item => (item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())))
    newList = newList.filter(item => selectedCats.length > 0 ? selectedCats.includes(item.category) : true)
    newList = newList.filter(item => price ? (item.price > price.min && item.price < price.max): true)
    

    
    // [].filter(item => selectedCats !=[] ? selectedCats.includes(item.category) : item.category)
    // .filter(item => price ? (item.price > price.min && item.price < price.max): item.price > 0)
    newList.map(item => productGrid.append(createProduct(item)))
}
