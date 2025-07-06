import React, { useState, useEffect } from 'react';
import { useUtils } from '../../../providers/UtilsProvider';

export const Appearance = () =>{
    const { themeUtils } = useUtils();
    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h4>Appearance</h4>
                <p>Customize your restaurant theme for tailored experience.</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-3">
                <label onClick={themeUtils.mode.dark} className="p-0" style={{width: '300px'}}>
                    <div className="bg-darker border border-lightly rounded-4 p-3 w-100 pointer pointer-effect">
                        <div className="d-flex gap-3 my-2">
                            <div className="p-2 bg-secondary"></div>
                            <div className="p-2 bg-secondary flex-fill"></div>
                            <div className="px-5"></div>
                        </div>
                        <div className="d-flex gap-3 my-2">
                            <div className="p-2 bg-secondary"></div>
                            <div className="p-2 bg-secondary flex-fill"></div>
                        </div>
                        <div className="d-flex gap-3 my-2">
                            <div className="py-2 px-5 bg-orange"></div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-2">
                        <input name="theme" type="radio" id="dark-mode" checked onChange={()=>{}} />
                        <label className="text-orange pointer" htmlFor="dark-mode">Dark mode</label>
                    </div>
                </label>

                <label onClick={themeUtils.mode.light} className="p-0" style={{width: '300px'}}>
                    <div className="bg-light border border-lightly rounded-4 p-3 w-100 pointer pointer-effect">
                        <div className="d-flex gap-3 my-2">
                            <div className="p-2 bg-dark"></div>
                            <div className="p-2 bg-dark flex-fill"></div>
                            <div className="px-5"></div>
                        </div>
                        <div className="d-flex gap-3 my-2">
                            <div className="p-2 bg-dark"></div>
                            <div className="p-2 bg-dark flex-fill"></div>
                        </div>
                        <div className="d-flex gap-3 my-2">
                            <div className="py-2 px-5 bg-orange"></div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-2">
                        <input name="theme" type="radio" id="light-mode" />
                        <label className="text-orange pointer" htmlFor="light-mode">Light mode</label>
                    </div>
                </label>
                
                <label onClick={themeUtils.mode.auto} className="p-0" style={{width: '300px'}}>
                    <div className="d-flex w-100 p-0 rounded-4 pointer pointer-effect">
                        <div className="p-3 rounded-start-4 border border-lightly w-100">
                            <div className="p-2 my-2 bg-secondary"></div>
                            <div className="p-2 my-2 bg-secondary" style={{width: '75%'}}></div>
                            <div className="d-flex mt-2 gap-3">
                                <div className="py-2 px-5 bg-orange"></div>
                            </div>
                        </div>
                        <div className="bg-light p-3 rounded-end-4 border border-lightly w-100">
                            <div className="p-2 my-2 bg-dark"></div>
                            <div className="p-2 my-2 bg-dark" style={{width: '75%'}}></div>
                            <div className="d-flex mt-2 gap-3">
                                <div className="py-2 px-5 bg-orange"></div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2 mt-2">
                        <input name="theme" type="radio" id="auto-mode" />
                        <label className="text-orange pointer" htmlFor="auto-mode">Auto</label>
                    </div>
                </label>
            </div>
        </div>
    )
}