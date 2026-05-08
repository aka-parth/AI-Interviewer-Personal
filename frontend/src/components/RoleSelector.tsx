interface Props {
  selectedRole: string;
  setSelectedRole: (
    role: string
  ) => void;
}

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Machine Learning Engineer",
];

export default function RoleSelector({
  selectedRole,
  setSelectedRole,
}: Props) {

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-bold">
        Select Role
      </h2>

      <div className="flex flex-wrap gap-3">

        {roles.map((role) => (

          <button
            key={role}
            onClick={() =>
              setSelectedRole(role)
            }
            className={`
              border
              rounded-xl
              px-4
              py-2

              ${
                selectedRole === role
                  ? "bg-black text-white"
                  : ""
              }
            `}
          >
            {role}
          </button>

        ))}

      </div>

    </div>
  );
}