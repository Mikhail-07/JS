import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

    elem = {}
    filters = {}

    constructor (products){
        this.products = products;
        
        this.render()
    }

    template(){
        return /*html*/`
        <div class="products-grid">
            <div class="products-grid__inner"></div>
        </div>`
    }

    render(){
        const elem = document.createElement('div')
        elem.innerHTML = this.template();
        this.elem = elem.firstElementChild;

        this.renderContent()
    }

    updateFilter(filters){
        Object.assign(this.filters, filters);
        this.renderContent()
    }

    inner(){
    return this.elem.querySelector('.products-grid__inner')
}

    renderContent(){
        this.inner().innerHTML = '';

        for(let p of this.products){
            if (this.filters.noNuts && p.nuts)continue;
            if (this.filters.vegeterianOnl && !p.vegeterian)continue;
            if (void 0!==this.filters.maxSpiciness && p.spiciness>this.filters.maxSpiciness)continue;
            if (this.filters.category && p.category!=this.filters.category)continue;
            const card = new ProductCard(p)
            this.inner().append(card.elem)
        }
    }
}
