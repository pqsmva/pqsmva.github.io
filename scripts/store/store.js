import { createProduct } from "../commons/product.js"
import { fetchProducts } from "../firebase/firebase.js"

const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get('s') || ''

let categories = []

let productTemp = []

let selectedCats = []

let products = []

const filterCategoryWrapper = document.querySelector('.category-filter')
const productGrid = document.querySelector('.products-grid')

fetchProducts().then(res => {
    products = res
    productTemp = res
    res.filter(item => ((item.category.toLowerCase()).includes(searchParam.toLowerCase()) || (item.name.toLowerCase()).includes(searchParam.toLowerCase()) )).map(item => {

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

        checkbox.addEventListener('input', (e)=> {
            if (e.target.checked) {
                selectedCats.push(cat.name)
            } else {
                selectedCats = selectedCats.filter(x => x!=cat.name)
            }

            productTemp = []

            selectedCats.map(sc => {
                productTemp = [...productTemp, ...products.filter(p => p.category == sc)]
                
            })

            if (selectedCats.length == 0) {
                productGrid.innerHTML = ''
                products.filter(item => item.name.includes(searchParam)).map(item => productGrid.append(createProduct(item)))
            } else {
                productGrid.innerHTML = ''
                productTemp.filter(item => item.name.includes(searchParam)).map(item => productGrid.append(createProduct(item)))
            }
            
            
        })

        const span = document.createElement("span");
        span.textContent = `${cat.name} (${cat.count})`;


        label.appendChild(checkbox);
        label.appendChild(span);

        filterCategoryWrapper.appendChild(label);
    });


})






