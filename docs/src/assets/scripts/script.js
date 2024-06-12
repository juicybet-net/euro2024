const navigationItems = document.querySelectorAll('.menu__nav_item');
const navigation = document.querySelector('.menu__nav');
const contentBody = document.querySelectorAll('.menu__cards')

const onToggleNavigationItem = (e) => {
    e.stopPropagation()
    const item = e.target
    console.log(item)
    const category = item.dataset.category
    const content = document.querySelector(`[data-content="${category}"]`)
    if(!item.classList.contains('active')){
        navigationItems.forEach(item => item.classList.remove('active'))
        contentBody.forEach(item => item.classList.remove('active'))
        item.classList.add('active')
        content.classList.add('active')
    }   
    CheckMenuBgStyle()
}

navigationItems.forEach(item => item.addEventListener('click', onToggleNavigationItem))




function CheckMenuBgStyle() {
    const menuBody = document.querySelector('.menu__body')
    const menuNavItems = document.querySelectorAll('.menu__nav_item')

    menuNavItems.forEach((item, index) => {
        if(item.classList.contains('active')){
          
            switch(index) {
                case 0: {
                    menuBody.style['border-radius'] = '0 33px 33px 33px'
                    menuNavItems[1].style['padding'] = '18px 20px'
                    break;
                } 
                case (menuNavItems.length-1): {
                    menuBody.style['border-radius'] = '33px 0 33px 33px'
                    menuNavItems[1].style['padding'] = '18px 20px'
                    break;

                } 
                default: {
                    menuBody.style['border-radius'] = '33px'
                    menuNavItems[0].style['padding'] = '18px 20px 18px 0'
                    menuNavItems[2].style['padding'] = '18px 0 18px 20px'
                    break;
                }
            }
        }
    })
}


CheckMenuBgStyle()