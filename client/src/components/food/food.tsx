import styled from 'styled-components';
import { useFood } from '../../hooks/useFood';
import { useMeal } from '../../hooks/useMeal';
import { Food as FoodType } from '../../types/food';
import { Macros } from '../../types/macros';
import { ServingsInput } from '../../ui/input/input';
import { PurpleWideButton } from '../button/button';

const StyledFood = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FoodName = styled.h2`
  color: var(--color-indigo-700);
`;

const FoodBrand = styled.h3`
  color: var(--color-slate-700);
  font-weight: 600;
`;

const ServingSizeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardLabel = styled.div`
  color: var(--color-slate-600);
  font-weight: 500;
`;

interface FoodProps {
  food: FoodType;
}

export default function Food({ food }: FoodProps) {
  const { foods, dispatch: mealDispatch } = useMeal();
  const {
    dispatch: foodDispatch,
    foodState: { foodServings },
  } = useFood();

  const isInMeal = foods.map((f) => f.food._id).includes(food._id);

  function handleClick() {
    const newFood = {
      food,
      servings: Number(foodServings),
    };

    mealDispatch({ type: 'meal/addFood', payload: newFood });
    foodDispatch({ type: 'food/changeServings', payload: { servings: '1' } });
  }

  return (
    <StyledFood>
      <div>
        <FoodName>{food.name}</FoodName>
        <FoodBrand>{food.brand}</FoodBrand>
      </div>
      <ServingSizeContainer>
        <CardLabel>Serving size:</CardLabel>
        <div>{food.servingSize}</div>
      </ServingSizeContainer>
      <ServingsContainer>
        <CardLabel as={'label'} htmlFor='servings'>
          Servings:
        </CardLabel>
        <ServingsInput
          name={'servings'}
          id={'servings'}
          type='number'
          value={foodServings}
          onChange={(evt) =>
            foodDispatch({
              type: 'food/changeServings',
              payload: { servings: evt.target.value },
            })
          }
        />
      </ServingsContainer>
      <MacroDisplay
        servings={Number(foodServings)}
        calories={food.calories}
        macros={food.macros}
      />
      <PurpleWideButton disabled={isInMeal} onClick={handleClick}>
        Add to meal
      </PurpleWideButton>
    </StyledFood>
  );
}

const StyledMacroDisplay = styled.div`
  padding: 1rem;
  border-radius: var(--lg-radius);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
`;

const MacroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const NutritionFacts = styled.div`
  color: var(--color-slate-600);
  font-weight: 500;
  padding: 0 0.75rem 1px 0.75rem;
  border-bottom: 1px solid var(--color-slate-600);
`;

interface MacroDisplayProps {
  calories: number;
  macros: Macros;
  servings?: number;
}

function MacroDisplay({ calories, macros, servings = 1 }: MacroDisplayProps) {
  const { carbs, fat, protein } = macros;

  const carbAmount = servings * carbs;
  const fatAmount = servings * fat;
  const proteinAmount = servings * protein;
  const calorieAmount = servings * calories;

  return (
    <StyledMacroDisplay>
      <NutritionFacts>Nutrition Facts</NutritionFacts>
      <MacroContainer>
        <Macro macro={'calories'} macroAmount={calorieAmount} />
        <Macro macro={'fat'} macroAmount={fatAmount} />
        <Macro macro={'carbs'} macroAmount={carbAmount} />
        <Macro macro={'protein'} macroAmount={proteinAmount} />
      </MacroContainer>
    </StyledMacroDisplay>
  );
}

const StyledMacro = styled.div`
  display: flex;
  color: var(--color-indigo-800);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

interface MacroProps {
  macro: string;
  macroAmount: number;
}

function Macro({ macro, macroAmount }: MacroProps) {
  return (
    <StyledMacro>
      <div>
        {macroAmount}
        {macro === 'calories' ? '' : 'g'}
      </div>
      <div>{macro}</div>
    </StyledMacro>
  );
}
