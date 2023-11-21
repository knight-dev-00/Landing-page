/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const fragment = document.createDocumentFragment();
const sectionNum = document.querySelectorAll('section').length;
const navBar = document.getElementById('navbar__list');
const navMenu = document.getElementsByClassName('navbar__menu')[0];
const hamburgerIcon = document.getElementsByClassName('navbar__hamburger__icon')[0];
let anchorId;
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function scrollToSection () {
  const section = document.getElementById(anchorId);
  window.scrollTo({
    top: section.getBoundingClientRect().y+window.scrollY,
    // Adding window.scrollY helps in stabilizing scrolling to sections
    left: 0,
    behavior: 'smooth'
  })
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav

// A function that creates new navigation items to add it to the navigation bar
function addNavItem () {
  const newNavItem = document.createElement('li');
  const newNavLink = document.createElement('a');
  newNavLink.classList.add('menu__link');
  newNavLink.appendChild(newNavItem);
  const sectionId = 'section'+i;
  newNavLink.classList.add(sectionId);
  const sectionDatanav = document.getElementById(sectionId);
  newNavItem.textContent = sectionDatanav.dataset.nav;
  fragment.appendChild(newNavLink);
};

// Add class 'active' to section when near top of viewport

/**
 * This function loops over each section to detect the one in the viewport and
 * assign "your-active-class" to the class attribute of it
*/

function activateSection () {
  for (i = 1; i <= sectionNum; i++) {
    const sectionId = 'section'+i;
    const sectionStatus = document.getElementById(sectionId);
    const navBarItemStat = document.getElementsByClassName(sectionId)[0];
    const sectionPosition = sectionStatus.getBoundingClientRect();
    if (sectionPosition.top < 325 && sectionPosition.bottom > 325) {
      sectionStatus.classList.add("your-active-class");
      navBarItemStat.classList.add("your-active-link");
    } else {
      sectionStatus.classList.remove("your-active-class");
      navBarItemStat.classList.remove("your-active-link");
    }
  }
};

// Scroll to anchor ID using scrollTO event

/**
 * This function detects where the click occurred and hence will lead to
 * scrolling to the corresponding section. If the click on the navigation bar
 * was outside the section icons, the page will scroll to the top.
*/
function scrollToPagePart (evt) {
  if (evt.target.tagName === 'LI') {
    anchorId = evt.target.parentElement.classList[1];
    scrollToSection();
  } else if (evt.target.tagName === 'A') {
    /**
     * Clicking on the white frame 'inside the a element and outside the li
     * element' will lead to scrolling to its section
    */
    anchorId = evt.target.classList[1];
    scrollToSection();
  } else {
    // Clicking on the navigation bar outside section icon will lead to scrolling up
    window.scrollTo({
      top: 0,
      // Adding window.scrollY helps in stabilizing scrolling to sections
      left: 0,
      behavior: 'smooth'
    })
  }
};

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// This for loop loops over each section to create a navigation bar icon for it

for (i = 1; i <= sectionNum; i++) {
  addNavItem()
}
navBar.appendChild(fragment);

// Scroll to section on link click

navMenu.addEventListener('click', scrollToPagePart);

// Set sections as active

document.addEventListener('scroll', activateSection);

// Open navigation list on clicking the hamburger icon
console.log(hamburgerIcon);
hamburgerIcon.addEventListener('click', function(e) {
  console.log(hamburgerIcon);
  hamburgerIcon.classList.toggle('change');
  navBar.classList.toggle('open');
  e.stopPropagation();
});
