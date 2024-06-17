document.addEventListener('DOMContentLoaded', () => {
    const navigationItems = document.querySelectorAll('.menu__nav_item');
    const navigation = document.querySelector('.menu__nav');
    const contentBody = document.querySelectorAll('.menu__cards')
    const menuBody = document.querySelector('.menu__body')


    //create plane
    const bgPlane = document.createElement('span')
    bgPlane.classList.add('menu__nav_plane')
    // bgPlane.style.height = menuBody.getBoundingClientRect().height + 'px'

    const onToggleNavigationItem = (e) => {
        e.stopPropagation()
        const item = e.target
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

    const menuNavBorderRadius = window.innerWidth > 650 ? '33px' : '20px' 
    const menuNavItemPaddingY = window.innerWidth > 650 ? '18px' : '8px' 
    const menuNavItemPaddingX = window.innerWidth > 650 ? '20px' : '10px' 



    function CheckMenuBgStyle() {
       
        //delete planes
        const plane = document.querySelector('.menu__nav_plane')
        plane?.remove()

        const scrollLeft = navigation.scrollLeft;
        const navWidth = navigation.scrollWidth - navigation.clientWidth;

        navigationItems.forEach((item, index) => {
            if(item.classList.contains('active')){
            
                switch(index) {
                    case 0: {
                        menuBody.style['border-radius'] = `0 ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius}`
                        navigationItems[1].style['padding'] = `${menuNavItemPaddingY} ${menuNavItemPaddingX}`


                        if(scrollLeft / navWidth > 0.5) {
                            bgPlane.style.borderRadius = `0`
                        }else {
                            bgPlane.style.borderRadius = `0 ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius} `
                        }
                        bgPlane.style.left = '0'
                        bgPlane.style.transform = `translateX(calc(${-(scrollLeft / navWidth * 100)}%))`;
                        menuBody.appendChild(bgPlane)
                        navigation.addEventListener('scroll', () => updateBgPlanePosition(0));
                        break;
                    } 
                    case (navigationItems.length-1): {
                        menuBody.style['border-radius'] = `${menuNavBorderRadius} 0 ${menuNavBorderRadius} ${menuNavBorderRadius}`
                        navigationItems[1].style['padding'] = `${menuNavItemPaddingY} ${menuNavItemPaddingX}`


                        bgPlane.style.left = '100%'
                        if(scrollLeft / navWidth < 0.5) {
                            bgPlane.style.borderRadius = `0`
                        }else {
                            bgPlane.style.borderRadius = `${menuNavBorderRadius} 0 ${menuNavBorderRadius} ${menuNavBorderRadius} `
                        }
                        bgPlane.style.transform = `translateX(calc(${-(scrollLeft / navWidth * 100)}%))`;

                        menuBody.appendChild(bgPlane)
                        navigation.addEventListener('scroll', () => updateBgPlanePosition(2));
                        break;

                    } 
                    default: {
                        menuBody.style['border-radius'] = `${menuNavBorderRadius}`
                        navigationItems[0].style['padding'] = `${menuNavItemPaddingY} ${menuNavItemPaddingX} ${menuNavItemPaddingY} 0`
                        navigationItems[2].style['padding'] = `${menuNavItemPaddingY} 0 ${menuNavItemPaddingY} ${menuNavItemPaddingX}`

                        bgPlane.style.left = 'auto'
                        bgPlane.style.right = '0px'
                        bgPlane.style.borderRadius = `${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius}`
                        bgPlane.style.transform = `translateX(calc(40px + ${-(scrollLeft / navWidth * 30)}%))`;
                        menuBody.appendChild(bgPlane)
                        navigation.addEventListener('scroll', () => updateBgPlanePosition(1));
                        break;
                    }
                }
            }
        })
    }


    const updateBgPlanePosition = (index) => {
        if(bgPlane) {
            const scrollLeft = navigation.scrollLeft;
            const navWidth = navigation.scrollWidth - navigation.clientWidth;
            
            switch(index) {
                case 0: {
                    if((scrollLeft / navWidth) > 0.5) {
                        bgPlane.style.borderRadius = `0`
                        menuBody.style.borderRadius = `0 ${menuNavBorderRadius} ${menuNavBorderRadius} 0`
                    }else {
                        bgPlane.style.borderRadius = `0 ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius}`
                        menuBody.style.borderRadius = `0 ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius}`

                    }
                    bgPlane.style.transform = `translateX(calc(${-(scrollLeft / navWidth * 100)}%))`;
                    break;
                }
                case 1: {
                    bgPlane.style.borderRadius = `${menuNavBorderRadius}`
                    menuBody.style.borderRadius = `${menuNavBorderRadius}`
                    bgPlane.style.transform = `translateX(calc(40px + ${-(scrollLeft / navWidth * 30)}%))`;
                    break;
                }
                case 2: {
                    if((scrollLeft / navWidth) < 0.5 || (scrollLeft / navWidth) == 0 ) {
                        bgPlane.style.borderRadius = `0`
                        menuBody.style.borderRadius = `${menuNavBorderRadius} 0 0 ${menuNavBorderRadius}`

                    }else {
                        bgPlane.style.borderRadius = `${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius} `
                        menuBody.style.borderRadius = `${menuNavBorderRadius} 0 ${menuNavBorderRadius} ${menuNavBorderRadius}`

                    }
                    bgPlane.style.transform = `translateX(calc(${-(scrollLeft / navWidth * 100)}%))`;
                    break;
                }

            }
        }
    };

    CheckMenuBgStyle()
})