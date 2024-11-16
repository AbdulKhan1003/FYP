import React from 'react'
import Title from '../ReUsables/Title'

export default function FAQ() {

    return (
        <section className="banner-section overflow-hidden faq-cont py-5">
            <div className="container mw-1470">
                <div className="pt-2 px-2">
                    <Title heading="Frequently Asked Questions"></Title>
                    <div className="accordion w-auto mt-5" id="accordionExample">
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header shadow-faq" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    <strong className='fs-5'>What types of food can I order from your platform?</strong>
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body border" style={{ lineHeight: '30px', textAlign: 'left' }}>
                                    Our platform offers a diverse range of food options, from luxurious restaurant dishes to your favorite local vendors' meals. Whether you're craving traditional Pakistani cuisine, street food, or gourmet dining experiences, we've got you covered.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header shadow-faq" id="headingFour">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    <strong className='fs-5'>What are your delivery charges for different locations?</strong>
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                <div className="accordion-body border" style={{ lineHeight: '30px', textAlign: 'left' }}>
                                    We have a standard delivery fee of Rs.50 no matter how close or how far you are. As long as you are willing to order, we are willing to deliver.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header shadow-faq" id="headingFive">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    <strong className='fs-5'>What payment methods do you accept?</strong>
                                </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                <div className="accordion-body border" style={{ lineHeight: '30px', textAlign: 'left' }}>
                                    We accept a variety of payment methods, including credit/debit cards, mobile wallets, and cash on delivery. Choose the option that is most convenient for you at checkout.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3">
                            <h2 className="accordion-header shadow-faq" id="headingSix">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    <strong className='fs-5'>How can I track my order?</strong>
                                </button>
                            </h2>
                            <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                <div className="accordion-body border" style={{ lineHeight: '30px', textAlign: 'left' }}>
                                    After placing your order, you can track its status in real-time through our app or website. You'll receive updates on when your food is being prepared, when it's out for delivery, and when it's arriving at your doorstep.
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}
