import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Transportation from '../models/transportation.model';
import Authentication from '../services/authentication.service';
import transportationService from '../services/transportation.service';
import PagingComponent from './paging.component';
import TransportationFormComponent from './transportation-form.component';

export default function() {
  let [trans, setTrans] = useState<Transportation[]>([]);
  let [transId, setTransId] = useState<string>('');
  let [totalDocs, setTotalDocs] = useState<number>(0);

  const params = useParams();

  useEffect(() => {
    getTotalDocs(0);
  }, []);

  const getAll = (offset: number, count: number) => {
    if (params.travelingId) {
      transportationService
        .getAll(offset, count, params.travelingId)
        .then((response) => {
          setTrans(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getTotalDocs = (no: number) => {
    transportationService
      .getTotalDocs(params.travelingId || '')
      .then((response: any) =>
        calculatePagingAndPopulateData(response.data, no)
      )
      .catch((err) => console.log(err));
  };

  const calculatePagingAndPopulateData = (docs: number, no: number) => {
    setTotalDocs(docs);
    // console.log('docs',docs);

    let offset = no * parseInt(process.env.REACT_APP_ROWS_PER_PAGE || '', 10);
    getAll(offset, parseInt(process.env.REACT_APP_ROWS_PER_PAGE || ''));
  };

  const onEdit = (e: React.MouseEvent, transId: string) => {
    e.preventDefault();
    setTransId(transId);
  };

  const reload = (no: number) => {
    getTotalDocs(no);
  };

  const onUpdate = (isUpdated: Boolean) => {
    // console.log('isUpdated',isUpdated);
    if (isUpdated) {
      getTotalDocs(0);
    }
  };

  const onDelete = (id: string) => {
    if (confirm('Are you sure you want to delete?') === true) {
      transportationService
        .deleteOne(params.travelingId || '', id)
        .then((response) => {
          reload(0);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="header">Transportions</div>
      <div className="form-content">
        {Authentication.getInstance().token && (
          <TransportationFormComponent
            travelingId={params.travelingId || ''}
            transId={transId}
            isUpdated={onUpdate}
          />
        )}

        <hr />

        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration(Hours)</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trans.map((t, index) => (
              <tr key={index}>
                <td>{t.type}</td>
                <td>{t.duration}</td>
                <td>
                  {Authentication.getInstance().token && (
                    <a
                      className="fa-solid fa-pen-to-square"
                      onClick={(e) => onEdit(e, t._id)}
                    ></a>
                  )}
                </td>
                <td>
                  {Authentication.getInstance().token && (
                    <a
                      className="fa-solid fa-circle-minus"
                      onClick={() => onDelete(t._id)}
                    ></a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <PagingComponent totalDocs={totalDocs} onPageChange={reload} />
      </div>
    </div>
  );
}
