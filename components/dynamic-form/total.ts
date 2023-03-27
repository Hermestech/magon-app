const total = (
    downWages: number,
    integratedSalary: number,
    seniorityBonus: number,
    proportionalBonus: number,
    proportionalVacation: number,
    proportionalVacationBonus: number,
    twentyDaysByYear: number,
    earnedWages: number,
    anotherBenefits: number
) => {
    let constitutionalIndem = Number((integratedSalary * 90));
    let result = 
        (Math.round(constitutionalIndem * 100) +
        Math.round(downWages * 100) +
        Math.round(seniorityBonus * 100) +
        Math.round(proportionalBonus * 100) +
        Math.round(proportionalVacation * 100) +    
        Math.round(proportionalVacationBonus * 100) +
        Math.round(twentyDaysByYear * 100) +
        Math.round(earnedWages * integratedSalary * 100) +
        Math.round(anotherBenefits * 100)
        ) / 100;
    return result.toFixed(2);
}

export default total;