import '../styles/homePage.css';
import ScrollArrow from '../components/ScrollArrow.tsx';

export default function homePage() {
    return (

       
        <div className="homePage"> 
            <ScrollArrow />
            <div className="home-Page-Title">
                <h1>What we can do for you</h1>
            </div>

            <div className="liquid-box">
                <div className="text-box">
                    <p>We specialize in custom Lego designs and modifications, 
                        offering unique creations tailored to your preferences. 
                        Whether you're looking for a one-of-a-kind piece or a specific 
                        modification to an existing set, we have the expertise to bring 
                        your vision to life.
                    </p>
                </div>
            </div>

            <div className='box-2'>
                <div className="text-box">
                    <p>Our team is dedicated to providing high-quality custom Lego designs 
                        that meet your specifications. We work closely with you to ensure 
                        that every detail is perfect, from the initial concept to the final 
                        product. With our passion for Lego and commitment to excellence, 
                        we guarantee a unique and satisfying experience.
                    </p>
                </div>
            </div>

        </div>
    )}