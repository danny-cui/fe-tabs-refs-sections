import { useRef } from "react";
import "./App.css";
import {
  sectionTabs,
  sectionTab,
  sectionContents,
  sectionContent,
} from "./styles";

const tabs = [
  {
    key: "tab-1",
    title: "tab 1",
    section: (
      <div>
        <p>
          some contents 1, some contents 1, some contents 1, some contents 1,
          some contents 1, some contents 1, some contents 1, some contents 1
        </p>
      </div>
    ),
  },
  {
    key: "tab-2",
    title: "tab 2",
    section: (
      <div>
        <p>
          some contents 2, some contents 2, some contents 2, some contents 2,
          some contents 2, some contents 2, some contents 2, some contents 2,
          some contents 2
        </p>
      </div>
    ),
  },
  {
    key: "tab-3",
    title: "tab 3",
    section: (
      <div>
        <p>
          some contents 3, some contents 3, some contents 3, some contents 3,
          some contents 3, some contents 3, some contents 3, some contents 3,
          some contents 3, some contents 3, some contents 3
        </p>
      </div>
    ),
  },
  {
    key: "tab-4",
    title: "tab 4",
    section: (
      <div>
        <p>
          some contents 4, some contents 4, some contents 4, some contents 4,
          some contents 4, some contents 4, some contents 4, some contents 4
        </p>
      </div>
    ),
  },
  {
    key: "tab-5",
    title: "tab 5",
    section: (
      <div>
        <p>
          some contents 5, some contents 5, some contents 5, some contents 5,
          some contents 5, some contents 5, some contents 5, some contents 5,
          some contents 5, some contents 5, some contents 5
        </p>
      </div>
    ),
  },
];

function App() {
  const tabsRef = useRef([]);
  const sectionsRef = useRef([]);

  const handleIntersection = (isIntersect, curEle, index) => {
    if (isIntersect) {
      curEle.style.background = "green";

      if (tabsRef.current[index]) {
        tabsRef.current[index].style.background = "green";

        // window.scrollTo({
        //   left: tabsRef.current[index].offsetLeft,
        //   behavior: "smooth",
        // });
      }

      // tabsRef.current && tabsRef.current[index].style.background = "green";
    } else {
      curEle.style.background = "red";
      // tabsRef.current?.[index].style.background = "red";

      if (tabsRef.current[index]) {
        tabsRef.current[index].style.background = "";
      }
    }
  };

  const handleScroll = () => {
    sectionsRef?.current?.forEach((curEle, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isIntersect = entry.isIntersecting;
          handleIntersection(isIntersect, curEle, index);
        },
        {
          rootMargin: "-300px",
        }
      );

      observer.observe(curEle);
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return (
    <div className="App" id="appRoot">
      <header className="App-header" id="appHeader">
        <section id="section-tabs" style={sectionTabs}>
          {tabs.map((ele, index) => (
            <div
              key={ele.title}
              style={sectionTab}
              ref={(tabRef) => (tabsRef.current[index] = tabRef)}
              onClick={() => {
                window.scrollTo({
                  top: sectionsRef.current[index].offsetTop - 300,
                  behavior: "smooth",
                });
              }}
            >
              <h3>{ele.title}</h3>
            </div>
          ))}
        </section>
        <section id="section-list" style={sectionContents}>
          {tabs.map((ele, index) => (
            <div
              key={ele.title}
              style={sectionContent}
              ref={(eleref) => (sectionsRef.current[index] = eleref)}
            >
              <h3>{ele.section}</h3>
            </div>
          ))}
        </section>
      </header>
    </div>
  );
}

export default App;
