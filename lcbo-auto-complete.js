
window.autoComplete = (selector, options = null) => {
    window.lcboData = [];
    if (options) {
        window.options = options;
    }

    options = window.options;

    const computedHeaders = new Headers();
    computedHeaders.append('Authorization', `Token ${options.apiToken}`);
    const opts = {
        headers: computedHeaders
    }

    if (!selector.includes('lcboAutoComplete') && selector.length >= 3) {
        document.getElementById("showProduct").innerHTML = "";
        document.getElementById("filteredLiquor").innerHTML = "";
        const url = `${options.url}?q=${selector}&per_page=25`;
        fetch(url, opts) // Call the fetch function passing the url of the API as a parameter
            .then(data => {
                return data.json();
            }).
            then(data => {
                const liquorList = [...new Set(data.result)];
                this.liquorList = liquorList;
                document.getElementById("showProduct").innerHTML = "";
                const drilledDownProduct = document.getElementById("drilledDownProduct");
                if (typeof drilledDownProduct !== 'undefined' && drilledDownProduct !== null) {
                    drilledDownProduct.innerHTML = "";
                }
                const dataList = document.getElementById("filteredLiquor");
                dataList.innerHTML = "";
                liquorList.forEach(value => {
                    const inputList = document.getElementById("searchAutoComplete")
                    const option = document.createElement("option");
                    option.value = value.name;
                    option.setAttribute("class", "listItemSingular");
                    inputList.addEventListener("input", (value) => {
                        const data = inputList.value;
                        drillDownToCustomer(data);
                    });
                    dataList.appendChild(option);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

window.drillDownToCustomer = (customer) => {
    document.getElementById("showProduct").innerHTML = "";
    const liquorInfo = this.liquorList.find(valueToFind => {
        return valueToFind.name === customer;
    });
    this.selectedItem = liquorInfo;
    if (typeof this.selectedItem !== 'undefined') {
        const showDetails = document.getElementById('showProduct');
        Object.keys(this.selectedItem).forEach(key => {
            const itemLabel = document.createElement("Label");
            itemLabel.innerHTML = `${key} : ${this.selectedItem[key]}`;
            itemLabel.setAttribute("class", "listItemSingular")
            showDetails.appendChild(itemLabel);
        });
    }
}



