"use client";

import { AdminLayout } from '@/app/components/layout/admin-layout'
import React from 'react'
import { styles } from '@/app/subscriptions/page.module.css'

const ManagePlans = () => {
  return (
    <AdminLayout>
      <div>
        <h2>Manage Plans</h2>
        {/* <div className={styles.plansContainer}>
          <div className={styles.plansHeader}>
            <h2>Subscription Plans</h2>
            {canWriteUsers && (
              <button
                onClick={handleCreateTier}
                className={styles.createButton}
              >
                <Plus className="w-4 h-4" />
                Create New Tier
              </button>
            )}
          </div>
          <div className={styles.plansGrid}>
            {plans.map((plan, index) => (
              <div key={index} className={styles.planCard}>
                <h3 className={styles.planName}>{plan.title}</h3>
                <div className={styles.planPrice}>€{plan.purchasePrice}</div>
                <p>Status: {plan.status}</p>
                <p>
                  Duration:{" "}
                  {new Date(plan.startDateTime).toLocaleDateString()} →{" "}
                  {new Date(plan.endDateTime).toLocaleDateString()}
                </p>

                <ul className={styles.planStats}>
                  <li>Contacts: {plan.contacts}</li>
                  <li>Messages: {plan.messages}</li>
                  <li>Voice Call Duration: {plan.voiceCallDuration} mins</li>
                  <li>Video Call Duration: {plan.videoCallDuration} mins</li>
                </ul>

                {plan.features && plan.features.length > 0 && (
                  <div>
                    <h4>Features:</h4>
                    <ul className={styles.planFeatures}>
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className={styles.planFeature}>
                          <span>✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {canUpdateUsers && (
                  <div className={styles.planActions}>
                    <button
                      onClick={() => handleEditTier(plan)}
                      className={styles.actionButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeactivateTier(index)}
                      className={`${styles.actionButton} ${styles.deactivateButton}`}
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => handlePublishTier(index)}
                      className={`${styles.actionButton} ${styles.publishButton}`}
                    >
                      Publish
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </AdminLayout>
  )
}

export default ManagePlans