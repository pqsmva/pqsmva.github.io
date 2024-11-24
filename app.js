const API_KEY = '7b10bab938-afe8916489-sncond';

let inputs = [...document.querySelectorAll('input')];
let tabs = [...document.querySelectorAll('.currency-tabs')];
let rates = [...document.querySelectorAll('.rate-info')];
let numbersInput =  ['0','1','2','3','4','5','6','7','8','9', ".", ","]
let values = {
    from: 'RUB',
    to: 'USD',
    amount: inputs[0].value,
};


inputs.map((input, index) => {
    input.addEventListener('input', (e) => {
        const mainTab = tabs[index].querySelector('.active');
        const targetTab = tabs[1 - index].querySelector('.active');
        let temp = e.target.value.split('').filter(ch => numbersInput.find(i => i == ch)).map(ch => ch == ','? '.':ch).join('').slice(0,15);
        const temp2 = e.target.value.includes('.') ?  temp.split('.')[0] + '.' + temp.split('.').slice(1).filter(x => x != '.').join('').slice(0,5) : (e.target.value.charAt(0) == 0 && temp.length > 1) ?temp.slice(1):temp
        e.target.value = (temp.length>1 && temp2.split('')[0] == '.')?`0${temp2}`:temp2
        let value = e.target.value

        if (value > 0) {
            convertCurrency(mainTab.innerHTML, targetTab.innerHTML, value).then((res) => {
                if (res.result !== undefined) {
                    inputs[1 - index].value = res.result
                }
            }) 
        }

        if (value == '') {
            clearInputs()
        }
    });

    input.addEventListener('focus', ()=> {
        input.setAttribute('placeholder', 'Введите сумму.')
    })
    input.addEventListener('blur', ()=> {
        input.setAttribute('placeholder', '')
    })
});




tabs.map((tabList, index) => {
    const buttons = [...tabList.querySelectorAll('button')];

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            tabList.querySelector('.active').classList.remove('active');
            button.classList.add('active');

            const otherIndex = 1 - index;
            const mainValue = inputs[index].value || 1; 
            const mainTab = button.innerHTML;
            const targetTab = tabs[otherIndex].querySelector('.active').innerHTML;

            if(index == 0 ) {
                convertCurrency(mainTab, targetTab, mainValue).then((res) => {
                    if (res.result !== undefined) {
                        inputs[otherIndex].value = res.result.toFixed(5);
                    }
    
                    rates[index].innerHTML = `1 ${res.from} = ${res.rate} ${res.to}`;
                    rates[otherIndex].innerHTML = `1 ${res.to} = ${(1 / res.rate).toFixed(5)} ${res.from}`;
    
                    
                });
            } else  {convertCurrency(targetTab, mainTab, inputs[otherIndex].value).then((res) => {
                if (res.result !== undefined) {
                   inputs[index].value = (res.result + '').includes('.') ? res.result.toFixed(5) : res.result
                }

                rates[index].innerHTML = `1 ${res.from} = ${res.rate} ${res.to}`;
                rates[otherIndex].innerHTML = `1 ${res.to} = ${(1 / res.rate).toFixed(5)} ${res.from}`;

                
            });}
        });
    });
});


const convertCurrency = async (from, to, amount) => {
    const url = `https://api.fastforex.io/convert?from=${from}&to=${to}&amount=${amount}&precision=5&api_key=${API_KEY}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    if (!amount || amount < 0) {
        clearInputs();
        return { from, to, result: '', rate: 0 };
    }

    const response = await fetch(url, options).catch(()=> {
        document.querySelector('.error').innerHTML = 'нет подключения к интернету'
    })
    const data = await response.json();


    document.querySelector('.error').innerHTML = ''
    return { from, to, result: data.result[to], rate: data.result.rate };


    
};

const clearInputs = () => {
    inputs.forEach((input) => (input.value = ''));
};

convertCurrency('RUB', 'USD', 5000).then((res) => {
    if (res.result !== undefined) {
        inputs[0].value = 5000;
        inputs[1].value = res.result.toFixed(5);
    }
});
