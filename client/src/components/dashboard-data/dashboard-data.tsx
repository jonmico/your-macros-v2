import styled from 'styled-components';
import { FoodLog } from '../../types/food-log';
import { UserData } from '../../types/user-data';

const StyledDashboardData = styled.div`
  border-radius: 8px;
  padding: 1rem 2rem;
  background-color: var(--color-blue-100);
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--color-blue-300);
  border-radius: 6px;
`;

const TableHeader = styled.thead`
  border-bottom: 1px solid var(--color-blue-300);

  & th {
    border-bottom: 1px solid var(--color-blue-300);
    border-right: 1px solid var(--color-blue-300);
    padding: 0.5rem 0.75rem;
  }

  & th:last-of-type {
    border-right: none;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-blue-200);

  & td:last-of-type {
    border-right: none;
  }

  & th,
  td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--color-blue-200);
    border-right: 1px solid var(--color-blue-300);
  }

  &:last-of-type {
    border-bottom: none;

    & th,
    td {
      border-bottom: none;
    }
  }

  &:nth-child(2) {
    border-bottom: 1px solid var(--color-blue-300);

    & th,
    td {
      border-bottom: 1px solid var(--color-blue-300);
    }
  }
`;

interface RemainingTDProps {
  $value: number;
}

const RemainingTD = styled.td<RemainingTDProps>`
  color: ${(props) =>
    props.$value >= 0 ? 'var(--color-green-600)' : 'var(--color-red-500)'};
`;

interface DashboardGridProps {
  currentLog: FoodLog;
  userData: UserData;
}

export default function DashboardData({
  currentLog,
  userData,
}: DashboardGridProps) {
  const {
    logTotals: {
      calories: logCalories,
      macros: { fat: logFat, carbs: logCarbs, protein: logProtein },
    },
  } = currentLog;
  const {
    calories: userCalories,
    macros: { fat: userFat, carbs: userCarbs, protein: userProtein },
  } = userData;

  const remainingCalories = userCalories - logCalories;
  const remainingFat = userFat - logFat;
  const remainingCarbs = userCarbs - logCarbs;
  const remainingProtein = userProtein - logProtein;

  return (
    <StyledDashboardData>
      <Table>
        <TableHeader>
          <tr>
            <th></th>
            <th scope={'col'}>Calories</th>
            <th scope={'col'}>Fat</th>
            <th scope={'col'}>Carbs</th>
            <th scope={'col'}>Protein</th>
          </tr>
        </TableHeader>
        <tbody>
          <TableRow>
            <th scope={'row'}>Goals</th>
            <td>{userCalories}</td>
            <td>{userFat}</td>
            <td>{userCarbs}</td>
            <td>{userProtein}</td>
          </TableRow>
          <TableRow>
            <th scope={'row'}>Consumed</th>
            <td>{logCalories}</td>
            <td>{logFat}</td>
            <td>{logCarbs}</td>
            <td>{logProtein}</td>
          </TableRow>
          <TableRow>
            <th scope={'row'}>Remaining</th>
            <RemainingTD $value={remainingCalories}>
              {remainingCalories}
            </RemainingTD>
            <RemainingTD $value={remainingFat}>{remainingFat}</RemainingTD>
            <RemainingTD $value={remainingCarbs}>{remainingCarbs}</RemainingTD>
            <RemainingTD $value={remainingProtein}>
              {remainingProtein}
            </RemainingTD>
          </TableRow>
        </tbody>
      </Table>
    </StyledDashboardData>
  );
}
