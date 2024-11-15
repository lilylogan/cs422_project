import React from 'react'
import LearnMore from '../components/learnMore'
import Swal from 'sweetalert2'
import Tag from '../components/tag'
import ReactDOM from 'react-dom'
import wallyWale from '../assets/wally_wale.jpg'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LearnMoreContainer({ cname, data }) {

    const fullImagePath = data.image_path ? `${BACKEND_URL}/${data.image_path}` : wallyWale;

    const clickHandler = () => {
        Swal.fire({
            title: data.recipe_name,
            html: 
            `<div>
                <div class="alertFrameContainer">
                    <div class="alertPhotoFrame">
                        <img src=${fullImagePath} class="alertPhoto" />
                    </div>
                </div>
                <div class="timeContainer">
                    <h5 class="alertTime">Cook Time: ${data.cook_time}</h5>
                    <h5 class="alertTime">Total Time: 50 mins</h5>
                    <h5 class="alertTime">Prep Time: ${data.prep_time}</h5>
                </div>
                <div class="detailsContainer">
                    <h5 class="alertDetails">Servings: ${data.servings}</h5>
                    <h5 class="alertDetails">Cuisine: ${data.cuisine}</h5>
                </div>
                <h4>Ingredients</h4>
                <ul>
                    <li>Whale</li>
                    <li>Salt</li>
                    <li>Pepper</li>
                    <li>Tarter Sauce</li>
                    <li>Franks Buffalo</li>
                </ul>
                <h4>Directions</h4>
                <ol>
                    ${data.instructions}
                </ol>
            </div>
            `,
            text: 'Recipe information',
            icon: 'info',
            iconColor: '#4A7B32',
            confirmButtonText: 'Close',
            customClass: {
                confirmButton: 'custom-close-button',
                popup: 'customAlert',
            }
        });
    }

    return (
        <LearnMore onClick={clickHandler} cname={cname} />
    )
}

export default LearnMoreContainer;