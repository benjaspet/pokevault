import React from "react";
import { ISet } from "../types/ISet.ts";
import config from "../../config/config.json";
import {useNavigate} from "react-router-dom";

const getAllSets = async (): Promise<ISet[]> => {
  const response = await fetch(`${config.host}/api/v1/sets`);
  const data = await response.json();
  return data.data;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const Sets: React.FC = () => {

  const navigate = useNavigate();

  const [sets, setSets] = React.useState<ISet[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getAllSets().then((data) => {
      setSets(data);
      setLoading(false);
    });
  }, []);

  const handleRowClick = (setId: string) => {
    navigate(`/sets/${setId}/view`);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center my-4">
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table className="table table-striped mx-lg-5 px-lg-5 mx-sm-2 px-sm-2">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Released</th>
            <th scope="col" className="d-none d-sm-table-cell">Cards</th>
          </tr>
          </thead>
          <tbody>
          {sets.map((set, index) => (
            <tr key={index} onClick={() => handleRowClick(set.id)} style={{ cursor: "pointer" }}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={set.images.symbol}
                    alt={set.name}
                    style={{
                      maxWidth: "22px",
                      maxHeight: "22px",
                      objectFit: "contain",
                      marginRight: "8px",
                    }}
                  />
                  <span>
                      {set.name}
                    <small className={"text-secondary-emphasis ps-1"}>{set.ptcgoCode}</small>
                    </span>
                </div>
              </td>
              <td>{formatDate(set.releaseDate)}</td>
              <td className="d-none d-sm-table-cell">{set.total}/{set.printedTotal}</td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sets;
