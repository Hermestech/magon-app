import total from './total';

describe('total function', () => {
    test('should calculate the total correctly', () => {
        const downWages = 1000;
        const integratedSalary = 2000;
        const seniorityBonus = 300;
        const proportionalBonus = 400;
        const proportionalVacationBonus = 500;
        const proportionalVacation = 500;
        const twentyDaysByYear = 600;
        const earnedWages = 2;
        const anotherBenefits = 700;

        const expectedResult = (
            Number(downWages) +
            Number(integratedSalary * 90) +
            Number(seniorityBonus) +
            Number(proportionalBonus) +
            Number(proportionalVacationBonus) +
            Number(twentyDaysByYear) +
            Number(earnedWages * integratedSalary) +
            Number(anotherBenefits)
        ).toFixed(2);

        expect(total(
            downWages,
            integratedSalary,
            seniorityBonus,
            proportionalBonus,
            proportionalVacationBonus,
            proportionalVacation,
            twentyDaysByYear,
            earnedWages,
            anotherBenefits
        )).toBe(expectedResult);
    });
});


test('should return the correct sum when all values are zero', () => { 
    const result = total(0, 0, 0, 0, 0, 0, 0,0, 0);
    expect(result).toBe('0.00');
})

describe('total function with decimals', () => {
    test('should calculate the total correctly with decimal values', () => {
        const downWages = 1000.50;
        const integratedSalary = 2000.75;
        const seniorityBonus = 300.25;
        const proportionalBonus = 400.35;
        const proportionalVacationBonus = 500.45;
        const proportionalVacation = 500.55;
        const twentyDaysByYear = 600.55;
        const earnedWages = 0.8; // Un valor decimal entre 0 y 1 para representar el porcentaje
        const anotherBenefits = 700.65;
        const constitutionalIndem = Number((integratedSalary * 90).toFixed(2))
        const myEarnedWages = earnedWages * integratedSalary;
        const expectedResult = (
            downWages +
            constitutionalIndem +
            seniorityBonus +
            proportionalBonus +
            proportionalVacationBonus +
            twentyDaysByYear +
            myEarnedWages +
            anotherBenefits
        )

        expect(total(
            downWages,
            integratedSalary,
            seniorityBonus,
            proportionalBonus,
            proportionalVacationBonus,
            proportionalVacation,
            twentyDaysByYear,
            earnedWages,
            anotherBenefits
        )).toBe(expectedResult);
    });
});