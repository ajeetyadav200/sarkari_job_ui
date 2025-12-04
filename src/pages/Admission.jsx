const admissionData = [
  {
    id: 1,
    title: "BHU B.Sc. NURSING ENTRANCE TEST 2017",
    startDate: "15-03-2017",
    endDate: "15-04-2017"
  },
  {
    id: 2,
    title: "KENDRIYA VIDYALAYA Admission II to IX",
    startDate: "03-04-2017",
    endDate: "10-04-2017"
  },
  {
    id: 3,
    title: "UP BED Join Entrance Exam 2 Year Admission 2017",
    startDate: "10-03-2017",
    endDate: "05-04-2017"
  },
  {
    id: 4,
    title: "IIT JEE Advanced Admission 2017",
    startDate: "01-05-2017",
    endDate: "25-05-2017"
  }
];

const Admission = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Admission Details</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-3">
          {admissionData.map((admission) => (
            <li key={admission.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <div className="flex-1">
                  <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer">
                    {admission.title}
                  </h3>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Date: </span>
                    <span className="text-green-600 font-semibold">{admission.startDate}</span>
                    <span className="text-red-600 mx-2">⇔</span>
                    <span className="text-red-600 font-semibold">{admission.endDate}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Admission