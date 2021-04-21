import React from "react";
import VacancySalary from "./VacancySalary";
import { useState, useEffect } from "react";
import "../global.css";

function DetailedVacancy({ vacancy }) {
    const [detailedVacancyInfo, setdetailedVacancyInfo] = useState();
    useEffect(() => {
        fetch(`https://api.hh.ru/vacancies/${vacancy?.id}`)
            .then((res) => res.json())
            .then((result) => setdetailedVacancyInfo(result));
    }, [vacancy]);

    return (
        <div className="vacancy_info">
            <div className="vacancy_Name_And_Logo">
                {detailedVacancyInfo?.employer && (
                    <div className="vacancy_Name ">
                        <span className="detiledVacancyInfo_title">
                            Работадатель:
                        </span>{" "}
                        <span style={{ marginLeft: "8px" }}>
                            {detailedVacancyInfo.employer?.name}
                        </span>
                    </div>
                )}
                {detailedVacancyInfo?.employer.logo_urls?.original && (
                    <img
                        className="vacancy_Logo"
                        src={detailedVacancyInfo.employer.logo_urls?.original}
                        alt="company_Logo"
                    />
                )}
            </div>

            <div className=" vacancy_Salary">
                <span className="detiledVacancyInfo_title">Зарплата :</span>{" "}
                <VacancySalary salary={vacancy.salary} />
            </div>
            <div className="vacancy_Busyness">
                <span className="detiledVacancyInfo_title">Занятость</span> :{" "}
                {detailedVacancyInfo?.schedule?.name}
            </div>
            {detailedVacancyInfo?.address && (
                <div className=" vacancy_Address">
                    <span className="detiledVacancyInfo_title">Адрес</span> :{" "}
                    {detailedVacancyInfo.address?.city} ,{" "}
                    {detailedVacancyInfo.address?.street} ,
                    {detailedVacancyInfo.address?.building}
                </div>
            )}
            {detailedVacancyInfo ??
                React.createElement(detailedVacancyInfo?.description)}
            {vacancy?.snippet?.requirement && (
                <div className="vacancy_Requirement">
                    <span className="detiledVacancyInfo_title">
                        {" "}
                        Tребования
                    </span>{" "}
                    : {vacancy.snippet?.requirement}
                </div>
            )}
            {vacancy?.snippet?.responsibility && (
                <div className=" vacancy_Responsobility">
                    <span className="detiledVacancyInfo_title">
                        {" "}
                        Обязанности
                    </span>{" "}
                    : {vacancy?.snippet?.responsibility}
                </div>
            )}
            {detailedVacancyInfo?.experience?.name && (
                <div className="vacancy_Experience">
                    <span className="detiledVacancyInfo_title">
                        Опыт работы
                    </span>{" "}
                    : {detailedVacancyInfo.experience?.name}
                </div>
            )}
        </div>
    );
}

export default DetailedVacancy;
