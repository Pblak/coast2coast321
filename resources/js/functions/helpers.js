import moment from "moment/moment";
import {createToast, withProps} from "@/functions/mosha-vue-toastify.es";
import toastTmpl from "../../views/components/toastTmpl.vue";
import router from "@/routes";

export const getRandomInt = (min, max)=> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * switch theme and return true if the final them is dark
 * and dispatchEvent "themeChange" when changes are made
 * @param theme
 * @returns {string}
 */
const toggleTheme = (theme = null) => {
    let color = localStorage.getItem('color-theme')
    let output = ''
    if (theme) {
        output = theme
        color = getOppositeTheme(theme)
    } else {
        output = getOppositeTheme(color)
    }
    document.documentElement.classList.add(output);
    document.documentElement.classList.remove(color);
    localStorage.setItem('color-theme', output);
    const event = new CustomEvent('themeChange', {
        detail: {
            theme: localStorage.getItem('color-theme')
        }
    });
    window.dispatchEvent(event)
    return output
}
export const toggleNbsp = (val, remove = true) => {
    if (!val) return ''
    if (remove) return val.replace('%&nbsp;', ' ')
    return val.replace(' ', '%&nbsp;')
}
const getOppositeTheme = (theme = null) => {
    return theme === 'light' ? 'dark' : 'light'
}
export const _capitalize = (word = null) => {
    if (!word) return ''
    const firstLetter = word.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = word.slice(1)

    return firstLetterCap + remainingLetters
}
const toCurrency = (value = 0, opt = null) => {
    let _local = 'fr-FR',
        _style = 'currency',
        _currency = 'DZD',
        conf = {
            local: opt ? opt.local || _local : _local,
            options: {
                style: opt ? opt.style || _style : _style,
                currency: opt ? opt.currency || _currency : _currency
            }
        }
    value = parseFloat(value)
    return value.toLocaleString(conf.local, conf.options).replace('DZD', 'DA')
}
const toAbbString = (value) => {
    let newValue = value;
    if (value >= 1000) {
        value = parseInt(value)
        let suffixes = ["", "K", "M", "B", "T"];
        let suffixNum = Math.floor(("" + value).length / 3);
        let shortValue = '';
        for (let precision = 3; precision >= 1; precision--) {
            shortValue = ((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value));
            let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 2) {
                break;
            }
        }
        if (shortValue % 1 !== 0) shortValue = Math.floor(shortValue * 10) / 10;
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
}
const time_format = (time, ago = true, locale = 'fr', format = 'LLLL') => {
    let a = moment.locale();
    // .parseZone(time).utc() // .parseZone(time).utc()
    let obj = moment(time)
    obj.utcOffset()
    return ago ? obj.fromNow() : obj.format(format)
}

const round_to_two_decimal = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const calculate_sum_array = (array, property) => {
    return array.reduce((accumulator, object) => {
        return accumulator + object[property];
    }, 0);
}

const toast_form_response = (response, statusAllowed = 200) => {
    if (!response.data || !response.data._t) return;

    const options = {
        type: typeof response.data._i === "string" ? response.data._i : "success",
        timeout: 7000,
        position: 'bottom-right',
        transition: 'slide',
        showIcon: true,
    }

    createToast(withProps(toastTmpl, {
        type: options.type,
        title: typeof response.data._t === "string" ? response.data._t : "Opération terminée",
        description: response.data.message
    }), options)
}
const route_form_response = (response) => {
    if (!response.data || !response.data._r) return;
    let p = response.data._p || {}
    router.push({name: response.data._r, params: p})
}

export const array_has_keys = (pattern, target, strict = false) => {
    let value = 0;
    target.forEach(function (word) {
        value += pattern.includes(word) ? 1 : 0;
    });
    return strict ? target.length === value : value > 0
}
export const _if = (subject, operation = '==', value = true) => {
    switch (operation) {
        case '===':
            return subject === value
        case '!==':
            return subject !== value
    }
}

export const get_localisation = async () => {
    return await axios.get(`/api/address/DZ`).then((response) => {
        return response.data
    })
}

export const getFromMiddleware = (middleware, subject) => {
    if (typeof middleware === 'undefined') return ''
    middleware = typeof middleware === 'string' ? middleware.split('') : middleware
    let output = ''
    middleware.map((str) => {
        if (str.includes(subject)) {
            output = str.split(':')[1] || ''
        }
    })
    return output
}

export const reloadIfNotMove = (time = 3, fn) => {
    (function () {
        time = time * 60 * 1000
        let timeout;

        $(function () {
            startRefresh();
        });

        function startRefresh() {
            clearTimeout(timeout); // stop previous timeout
            timeout = setTimeout(() => {
                typeof fn === "function" ? fn() : ''
                startRefresh()
            }, time);
        }

        $('body').on('mousemove keydown', function () {
            startRefresh(); // restart timeout
        });
    }());
}
export const GlobalSearch = async (query, mainRouteName = 'dash') => {
    let result = {
        router: [],
        orders: [],
        articles: [],
    }
    // search in
    let regex = new RegExp(query, 'i'); 	// Create a regex object (a constructor).
    let mainRoute = router.currentRoute.value.matched.slice().reverse().find(r => r.name === 'dash')
    mainRoute.children.slice().reverse().map((r) => {
        if (r.meta && r.meta.__name && regex.test(r.meta.__name)) {
            if (typeof r.meta.sideBar === "undefined" || r.meta.sideBar === true) {
                result.router.push(r)
            }
        } else {
            if (r.children) {
                r.children.slice().reverse().map((c) => {
                    if (c.meta && c.meta.__name && regex.test(c.meta.__name)) {
                        if (typeof c.meta.sideBar === "undefined" || c.meta.sideBar === true) {
                            result.router.push(c)
                        }
                    }
                })
            }
        }
    })
    // console.log(result)
    // routes
    // orders
    // articles
    return result
}
export const permissionCategories = (category) => {
    const cat = {
        order: {
            __name: 'Commandes',
            status: {
                __name: ''
            }
        },
        article: {
            __name: 'Produits',
        },
        roleAndPermissions: {
            __name: 'Rôle & Permissions',
        },
        employee: {
            __name: 'Employés',
        },
        stats: {
            __name: 'Statistiques',
        },
        finance: {
            __name: 'Comptabilité',
        },
    }
    let c = category.split('.')
    return cat[c[0]] ? cat[c[0]].__name : c[0]
}
export const initialsToName = (languageCode = 'fr') => {

// Create an Intl.DisplayNames object
    let displayNames = new Intl.DisplayNames(['fr'], { type: 'language' });

// Convert the language code to a language name
    return displayNames.of(languageCode);
}
export const largestInArray = (array ) => {

    let largest = 0;

    for (let i=0; i<=array.length;i++){
        if (parseInt(array[i])>largest) {
              largest=parseInt(array[i]);
        }
    }
    return largest
}

export {
    toAbbString,
    toCurrency,
    toggleTheme,
    time_format,
    round_to_two_decimal,
    calculate_sum_array,
    toast_form_response,
    route_form_response,
}
