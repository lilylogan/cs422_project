import React from 'react'
import LearnMore from '../components/learnMore'
import Swal from 'sweetalert2'
import Tag from '../components/tag'
import ReactDOM from 'react-dom'
import wallyWale from '../assets/wally_wale.jpg'

function LearnMoreContainer({ cname, data }) {

    const clickHandler = () => {
        Swal.fire({
            title: data.recipe_name,
            html: 
            `<div>
                <div class="alertFrameContainer">
                    <div class="alertPhotoFrame">
                        <img src=${wallyWale} class="alertPhoto" />
                    </div>
                </div>
                <div class="timeContainer">
                    <h5>Cook Time: 20 mins</h5>
                    <h5>Total Time: 50 mins</h5>
                    <h5>Prep Time: ${data.prep_time}</h5>
                </div>
                <div>
                    <h5>Servings: ${data.servings}</h5>
                    <h5>Cuisine: WALE</h5>
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
                    <li>Find Whale</li>
                    <li>Fry Whale</li>
                    <li>Salt Whale</li>
                    <li>Pepper Whale</li>
                    <li>Drench in Franks Buffalo</li>
                    <li>Dip in tarter dauce</li>
                </ol>
            </div>
            `,
            text: 'Recipe information',
            icon: 'info',
            confirmButtonText: 'Close',
            customClass: {
                popup: 'customAlert'
            }
        });
    }

    return (
        <LearnMore onClick={clickHandler} cname={cname} />
    )
}

export default LearnMoreContainer;