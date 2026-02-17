import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch__checkbox" />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__f ui-text-2 toggle-switch__text">F</span>
      <span className="toggle-switch__c ui-text-2 toggle-switch__text">C</span>
    </label>
  );
}
