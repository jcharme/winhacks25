function Course(
  {course}: {course: Course}
) {
  return (
    <div className="w-full rounded-lg h-24 bg-slate-600">
      {course.description}
    </div>
  )
}

interface Course {
  id: number
  title: string
  description: string
  instructor: string
  semester: string
}

const courses: Course[] = [
  {
    id: 2310,
    title: "COMP-2310",
    description: "Theoretical Foundations of Computer Science",
    instructor: "Dr. Peter Tsin",
    semester: "F24"
  },
  {
    id: 2140,
    title: "COMP-2140",
    description: "Language, Grammars, and Translators",
    instructor: "Dr. Jianguo Tsin",
    semester: "F24"
  }
]

const enrolled: Course[] = [
  courses[0]
]

export default function Page() {
    return (
      <div>
        <h2 className="text-xl">Enrolled</h2>
        <ul className="p-2 grid gap-2">
          {
            courses
              .filter((course) => { return enrolled.includes(course) })
              .map((course) => { return <Course course={course} key={course.id} /> })
          }
        </ul>
        <h2 className="text-xl">Available</h2>
        <ul className="p-2 grid gap-2">
          {
            courses
              .filter((course) => { return !enrolled.includes(course) })
              .map((course) => { return <Course course={course} key={course.id} /> })
          }
        </ul>
      </div>
    );
  }