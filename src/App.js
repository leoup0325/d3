import ChartGauge from "./Components/ChartGauge";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Spinner } from "reactstrap";
import ReadnessImg from "./assets/image/readness.png";
import LightIconImg from "./assets/image/light-icon.png";
import TVIconImg from "./assets/image/tv-icon.png";
import SkillChart from "./Components/SkillChart";
import { useFetch } from "./hooks/useFetch";
import { fetchReportAPI } from "./apis/report";

const skills = [
  { title: "Self-Awareness", key: "self_awareness" },
  { title: "Optimistic Thinking", key: "optimistic_thinking" },
  { title: "Self Management", key: "self_management" },
  { title: "Goal-Directed Behavior", key: "goal_directed" },
  { title: "Social Awareness", key: "social_awareness" },
  { title: "Relationship Skills", key: "relationship_skills" },
  { title: "Personal Responsibility", key: "personal_responsibility" },
  { title: "Responsible Decision Making", key: "decision_making" },
];

function App() {
  const { data, loading } = useFetch(fetchReportAPI);

  return (
    <div className="App">
      <Header />
      <main className="py-4 px-lg-2">
        <section id="main-content">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="block">
                  <div className="bg1 title">
                    <h6 className="wc text-center">Overall Impact Score:</h6>
                  </div>
                  <div className="p-3 pb-0">
                    <p className="ffb bc text-center">
                      This score is calculated using weighted averages of the
                      progress your student has made developing the SEL skills
                      highlighted below.
                    </p>
                    {data && (
                      <ChartGauge impact={data.impact} gaugeMaxValue={12} />
                    )}
                    {loading && (
                      <div className="d-flex justify-content-center py-3">
                        <Spinner />
                      </div>
                    )}
                  </div>

                  <div className="jc notes pb-3">
                    <div className="note d-flex align-items-center">
                      <div className="square sq1"></div>
                      <p className="ffb ps-2">Approaching</p>
                    </div>

                    <div className="note d-flex align-items-center">
                      <div className="square sq2"></div>
                      <p className="ffb ps-2">Meets</p>
                    </div>

                    <div className="note d-flex align-items-center">
                      <div className="square sq3"></div>
                      <p className="ffb ps-2">Exceeds</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 mt-4 mt-lg-0">
                <img src={ReadnessImg} className="mx-auto" alt="readness" />
              </div>
            </div>

            <div className="block mt-4">
              <div className="bg1 title">
                <h6 className="wc text-center">Skills Progress</h6>
              </div>

              <div className="d-flex justify-content-center flex-wrap pb-4">
                {skills.map((skill) => (
                  <div key={skill.key} className="mt-4 graphic-block">
                    {loading ? (
                      <Spinner />
                    ) : (
                      data && (
                        <SkillChart
                          value={data[skill.key]}
                          title={skill.title}
                          maxValue={9}
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex flex-wrap spb">
              <div className="w1 mt-4">
                <div className="block mh gray">
                  <div className="bg1 title">
                    <p className="fs-16 wc text-center">
                      <strong>Academic Insights</strong>
                    </p>
                  </div>
                  <div className="text-center px-3 pt-3 pb-4">
                    <img
                      src={LightIconImg}
                      className="icon mx-auto"
                      alt="light"
                    />
                    <p className="ffb bc mt-2">{data?.words_written}</p>
                    <img
                      src={TVIconImg}
                      className="icon2 mx-auto mt-4"
                      alt="tv"
                    />
                    <p className="ffb bc mt-2">{data?.completion_rate}</p>
                  </div>
                </div>
              </div>
              <div className="w2 mt-4">
                <div className="block mh">
                  <div className="bg2 title">
                    <p className="fs-16 wc text-center">
                      <strong>Personal Highlights:</strong>
                    </p>
                  </div>
                  <div className="px-3 pt-3 pb-4">
                    <p>{data?.highlights}</p>
                  </div>
                </div>
              </div>
              <div className="w2 mt-4">
                <div className="block mh">
                  <div className="bg3 title">
                    <p className="fs-16 wc text-center">
                      <strong>Growth Areas & Next Steps:</strong>
                    </p>
                  </div>
                  <div className="px-3 pt-3 pb-4">
                    <p>{data?.growth}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
