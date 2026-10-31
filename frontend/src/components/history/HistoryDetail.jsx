import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { getHistoryRecord } from '../../services/historyService';
import { SERVICE_LABELS, formatInputs, formatDate } from './historyMeta';
import CropResult from '../results/CropResult';
import YieldResult from '../results/YieldResult';
import DiseaseResult from '../results/DiseaseResult';
import FertilizerResult from '../results/FertilizerResult';

const RESULT_VIEWS = {
  crop: CropResult,
  yield: YieldResult,
  disease: DiseaseResult,
  fertilizer: FertilizerResult,
};

const HistoryDetail = ({ id, onBack }) => {
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError('');
    setRecord(null);

    getHistoryRecord(id)
      .then((data) => !cancelled && setRecord(data))
      .catch((err) => {
        if (cancelled) return;
        setError(
          err.response?.status === 404
            ? 'This record was not found.'
            : err.response?.data?.message || 'Could not load this record. Please try again.'
        );
      })
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  const ResultView = record ? RESULT_VIEWS[record.service] : null;

  return (
    <div className="history-detail">
      <button type="button" className="button button--secondary history-detail__back" onClick={onBack}>
        <FiArrowLeft size={16} /> Back to history
      </button>

      {isLoading && <p className="history__status">Loading result...</p>}

      {error && (
        <div className="history__error" role="alert">
          <p>{error}</p>
          <button type="button" className="button button--secondary" onClick={() => setAttempt((n) => n + 1)}>
            Try again
          </button>
        </div>
      )}

      {record && (
        <>
          <div className="history-detail__head">
            <span className={`history-badge history-badge--${record.service}`}>{SERVICE_LABELS[record.service]}</span>
            <span className="history-detail__date">{formatDate(record.createdAt)}</span>
          </div>

          <h2 className="history-detail__heading">Inputs used</h2>
          <dl className="history-detail__inputs">
            {formatInputs(record.inputs).map((i) => (
              <div key={i.key}>
                <dt>{i.label}</dt>
                <dd>{i.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="history-detail__heading">Result</h2>
          {ResultView ? (
            <ResultView result={record.result} inputs={record.inputs} />
          ) : (
            <p className="history__status">This record type can no longer be displayed.</p>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryDetail;
