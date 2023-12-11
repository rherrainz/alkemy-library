import { DataTypes } from "sequelize";

const event = (sequelize) => {
  const Event = sequelize.define(
    "event",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registeredParticipants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isFinished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: true },
  );
  Event.associate = (models) => {
    Event.belongsToMany(models.User, { through: "event_user" });
  };
  return Event;
};

export default event;
