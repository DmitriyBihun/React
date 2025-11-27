import { useState } from "react";
import clases from "./PopularApplications.module.css";

const arrOfObjects = [
    {
        id: 1,
        name: "YouTube",
        title: "Youtube",
        descr: "YouTube is an American social media and online video sharing platform owned by Google. YouTube was founded on February 14, 2005, by Chad Hurley, Jawed Karim, and Steve Chen, who were former employees of PayPal.",
        link: "https://www.youtube.com/",
        img: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png'
    },
    {
        id: 2,
        name: "Instagram",
        title: "Instagram",
        descr: "Instagram is an American photo and short-form video sharing social networking service owned by Meta Platforms. Instagram has 3 billion monthly active users as of Q3 2025, making it one of the world's most popular social media platforms.",
        link: "https://www.instagram.com/",
        img: "https://cdn-icons-png.flaticon.com/128/2111/2111463.png"
    },
    {
        id: 3,
        name: "X",
        title: "X",
        descr: "X, formerly known as Twitter,[c] is an American microblogging and social networking service. It is one of the world's largest social media platforms and one of the most-visited websites.[10][11] Users can share short text messages, images, and videos in short posts (commonly and unofficially known as \"tweets\") and like other users' content",
        link: 'https://x.com/',
        img: "https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
    }
]

export default function PopularApplications() {
    return (
        <section className={clases.section}>
            <h2>Задача_5</h2>

            <ul className={clases['popular-list']}>
                {arrOfObjects.map(item => (
                    <li key={item.id} className={clases['popular-item']}>
                        <div className={clases['popular-item--content']}>
                            <img src={item.img} />
                            <div>
                                <span>{item.name}</span>
                                <a href={item.link}>{item.link}</a>
                            </div>
                        </div>
                        <h4>{item.title}</h4>
                        <p>{item.descr}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}