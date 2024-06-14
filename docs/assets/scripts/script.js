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

    const menuNavBorderRadius = window.innerWidth > 650 ? '33px' : '20px' 

    function CheckMenuBgStyle() {
       
        //delete planes
        const plane = document.querySelector('.menu__nav_plane')
        plane?.remove()


        navigationItems.forEach((item, index) => {
            if(item.classList.contains('active')){
            
                switch(index) {
                    case 0: {
                        menuBody.style['border-radius'] = `0 ${menuNavBorderRadius} ${menuNavBorderRadius} ${menuNavBorderRadius}`
                        navigationItems[1].style['padding'] = '18px 20px'
                        break;
                    } 
                    case (navigationItems.length-1): {
                        menuBody.style['border-radius'] = `${menuNavBorderRadius} 0 ${menuNavBorderRadius} ${menuNavBorderRadius}`
                        navigationItems[1].style['padding'] = '18px 20px'
                        break;

                    } 
                    default: {
                        menuBody.style['border-radius'] = `${menuNavBorderRadius}`
                        navigationItems[0].style['padding'] = '18px 20px 18px 0'
                        navigationItems[2].style['padding'] = '18px 0 18px 20px'
                        menuBody.appendChild(bgPlane)
                        break;
                    }
                }
            }
        })
    }


    const updateBgPlanePosition = () => {
        if(bgPlane) {
            const scrollLeft = navigation.scrollLeft;
            const navWidth = navigation.scrollWidth - navigation.clientWidth;
            const bodyWidth = menuBody.clientWidth;
            
            // Calculate the position of the bgPlane based on scroll position
            const bgPlaneLeft = (scrollLeft / navWidth) * (bodyWidth - bgPlane.clientWidth);
            // console.log(bgPlaneLeft)
            bgPlane.style.transform = `translateX(calc(40px + ${-(scrollLeft / navWidth * 30)}%))`;
        }
    };

    navigation.addEventListener('scroll', updateBgPlanePosition);

    CheckMenuBgStyle()
})