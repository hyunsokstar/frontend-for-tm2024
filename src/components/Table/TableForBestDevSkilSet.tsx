import React from 'react';

type BestDevSkillSet = {
    language: string;
    backend: string;
    frontend: string;
    orm: string;
    css: string;
};

const bestDevSkillSets: BestDevSkillSet[] = [
    {
        language: "Type Script",
        backend: "Nest.js",
        frontend: "Next Js (front)",
        orm: "TypeOrm",
        css: "Chakra-ui"
    },
    {
        language: "Java",
        backend: "Spring Boot",
        frontend: "Next Js (front)",
        orm: "Jpa",
        css: "Tailwind CSS"
    },
    {
        language: "Python",
        backend: "FastApi",
        frontend: "Next Js (full stack)",
        orm: "Prisma",
        css: "Shaden Ul"
    },
    {
        language: "Go",
        backend: "Gin",
        frontend: "Nuxt js",
        orm: "Sequelize",
        css: "Tailwind CSS"
    },
    {
        language: "Java Script",
        backend: "LaLabel",
        frontend: "SvelteKit",
        orm: "Drizzle",
        css: "Chakra-ui"
    }
];

const TableForBestDevSkilSet = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Language</th>
                    <th>Backend</th>
                    <th>Frontend</th>
                    <th>ORM</th>
                    <th>CSS</th>
                </tr>
            </thead>
            <tbody>
                {bestDevSkillSets.map((skillSet, index) => (
                    <tr key={index}>
                        <td>{skillSet.language}</td>
                        <td>{skillSet.backend}</td>
                        <td>{skillSet.frontend}</td>
                        <td>{skillSet.orm}</td>
                        <td>{skillSet.css}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableForBestDevSkilSet;
